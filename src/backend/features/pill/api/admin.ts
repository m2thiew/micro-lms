/**
 * src/backend/features/pill/api/admin.ts
 *
 * chiamate API per geatione pillole da parte degli admin
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import { adminAPIProcedure } from "@/backend/lib/trpc/procedures";
import { createAPIRouter } from "@/backend/lib/trpc/server";
import { SESSION_DIR_NAME, toServerPath, toUrlPath } from "@/backend/utils/upload";
import {
  adminPillApiCreateSchema,
  adminPillApiDeleteSchema,
  adminPillApiGetSchema,
  adminPillApiUpdateSchema,
  uploadPillContentConfig,
  uploadPillThumbConfig,
  type PillAdminData,
} from "@/shared/features/pill/schema";
import { type Pill, type PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { copyFileSync, existsSync, mkdirSync, rmSync, unlinkSync } from "fs";
import path, { basename } from "path";

// ------------------------------------------------------------------------------------------------

type MoveOperation = {
  filename?: string;
  from: string;
  to: string;
  isCopied?: boolean;
  isMoved?: boolean;
};

// ------------------------------------------------------------------------------------------------

/**
 * Data una pillola recuperata da DB, recupera e agggiunge la proprietà "content" della stessa
 * @param pill pillola recuperata da DB
 * @param db connessione al DB
 * @returns pillole con aggiunta la proprietà "content"
 */
const addPillContent = async (pill: Pill, db: PrismaClient): Promise<PillAdminData> => {
  const pillContent = await db.pillContent.findMany({
    select: { path: true },
    where: { pillId: pill.id },
    orderBy: { id: "asc" },
  });

  // estrea i path dei contenuti
  const contents: string[] = pillContent.map((c) => c.path);
  const first = contents.shift();

  // non può esistere una pillola senza almeno un contenuto.
  if (!first) throw new Error(`pill ${pill.id} has no content`);

  // garantisce che sia sempre presente un elmento nell'array.
  const content: [string, ...string[]] = [first, ...contents];

  return {
    ...pill,
    content,
  };
};

// ------------------------------------------------------------------------------------------------

const execFileMoves = (...fileMoves: MoveOperation[]): string[] => {
  const movedFiles: string[] = [];

  try {
    // eseegue un primo ciclo in cui copia i file nelle destinaizoni previste.
    for (const fileMove of fileMoves) {
      if (fileMove.from && fileMove.to) {
        fileMove.isCopied = false;
        // ottiene il percorso alla cartella di destinazione.
        const toFileName = path.basename(fileMove.to);
        const toDir = fileMove.to.replace(toFileName, "");

        // crea la cartella di destinazione se non esiste già.
        if (!existsSync(toDir)) mkdirSync(toDir, { recursive: true });

        // copia il file dalla posizione originale a quella di destinazione
        copyFileSync(fileMove.from, fileMove.to);

        // segna che l'operazoione è andata a buon fine.
        fileMove.isCopied = true;
      }
    }

    // non si è verificato alcun errore nella copia. Si procede a rimuovere i file originali.
    for (const fileMove of fileMoves) {
      if (fileMove.from && fileMove.to) {
        unlinkSync(fileMove.from);

        // lo spostamento è completato.
        fileMove.isMoved = true;

        movedFiles.push(fileMove.to);
      }
    }

    return movedFiles;
  } catch (error) {
    // una operazione di copia è fallita. Rimuove tutte le copie dei file
    // già eseguite.
    for (const fileMove of fileMoves) {
      if (fileMove.from && fileMove.to && fileMove.isCopied) {
        unlinkSync(fileMove.to);
      }
    }

    // rilancia l'errore.
    throw error;
  }
};

// ------------------------------------------------------------------------------------------------

/**
 * Elenco delle pillole.
 */
const list = adminAPIProcedure.query(async ({ ctx }): Promise<PillAdminData[]> => {
  const { db } = ctx;

  // dati della pillola
  const pills = await db.pill.findMany({
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
      title: true,
      description: true,
      thumbPath: true,
    },
  });

  // aggiunge i contenuti per tutte le pillole recuperate.
  const addPillContentAsync = pills.map((p) => addPillContent(p, db));
  const pillsWithContent = await Promise.all(addPillContentAsync);

  return pillsWithContent;
});

// ------------------------------------------------------------------------------------------------

/**
 * Dati di una singola pillola.
 */
const get = adminAPIProcedure
  .input(adminPillApiGetSchema)
  .query(async ({ ctx, input }): Promise<PillAdminData> => {
    const { db } = ctx;

    // recupero della pillola
    const pill = await db.pill.findUnique({
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        title: true,
        description: true,
        thumbPath: true,
      },
      where: {
        id: input.id,
      },
    });

    if (!pill) throw new TRPCError({ code: "NOT_FOUND" });

    // aggiunta contenuti della pillola.
    const pillsWithContent = await addPillContent(pill, db);

    return pillsWithContent;
  });

// ------------------------------------------------------------------------------------------------

/**
 * Creazione di una nuova pillola
 */
const create = adminAPIProcedure
  .input(adminPillApiCreateSchema)
  .mutation(async ({ ctx, input }): Promise<PillAdminData> => {
    const { db } = ctx;

    // si esegue l'operazione in una transazione. Se avviene un errore nello successivo
    // spostamento dei file, il precente record inserito/modificato in DB viene annullato.
    // la funzione "execFileMoves" elimina anche i file già copiati in caso di errore.

    return await db.$transaction(async (tx): Promise<PillAdminData> => {
      // inserimento nuova pillola (senza file).
      const newPill = await tx.pill.create({
        data: {
          title: input.title,
          description: input.description,
        },
      });

      console.log(newPill);

      // operazioni sui file.
      const { uploadDir: thumbDir } = uploadPillThumbConfig;
      const { uploadDir: contentDir } = uploadPillContentConfig;
      const pillDirName = newPill.id.toString().padStart(3, "0");

      // sposta i file caricati nella cartella ufficiale.

      let thumbPath = "";
      if (input.thumbPath) {
        const thumbMove: MoveOperation = {
          from: toServerPath(input.thumbPath),
          to: toServerPath(thumbDir, pillDirName, basename(input.thumbPath)),
        };

        console.log(thumbMove);

        const thumbMoved = execFileMoves(thumbMove).at(0);
        thumbPath = thumbMoved ? toUrlPath(thumbMoved) : "";
      }

      const contentMoves = input.content.map((contentPath): MoveOperation => {
        return {
          from: toServerPath(contentPath),
          to: toServerPath(contentDir, pillDirName, basename(contentPath)),
        };
      });

      console.log(contentMoves);

      const contentMoved = execFileMoves(...contentMoves).map(toUrlPath);
      const content: [string, ...string[]] = [contentMoved.shift() ?? "", ...contentMoved];

      // i file sono stati spostati con successo. Aggiorno i percorsi dei file in database.
      console.log(thumbPath, content);

      const contendData = content.map((path) => {
        return { path };
      });

      const newPillWithFiles = await tx.pill.update({
        data: {
          thumbPath: thumbPath,
          PillContent: {
            createMany: { data: contendData },
          },
        },
        where: {
          id: newPill.id,
        },
      });

      // restituisce la pillola creata.
      return {
        ...newPillWithFiles,
        content,
      };
    });
  });

// ------------------------------------------------------------------------------------------------

/**
 * Aggiorna una pillola
 */
export const update = adminAPIProcedure
  .input(adminPillApiUpdateSchema)
  .mutation(async ({ ctx, input }): Promise<PillAdminData> => {
    const { db } = ctx;

    // si esegue l'operazione in una transazione. Se avviene un errore nello successivo
    // spostamento dei file, il precente record inserito/modificato in DB viene annullato.
    // la funzione "execFileMoves" elimina anche i file già copiati in caso di errore.

    return await db.$transaction(async (tx): Promise<PillAdminData> => {
      // operazioni sui file.
      const { uploadDir: thumbDir } = uploadPillThumbConfig;
      const { uploadDir: contentDir } = uploadPillContentConfig;
      const pillDirName = input.id.toString().padStart(3, "0");

      // verifica l'upload di nuovi file.
      const isNewThumb = input.thumbPath && input.thumbPath.includes(SESSION_DIR_NAME);
      const isNewContent = input.content[0].includes(SESSION_DIR_NAME);
      const isThumbDeleted = !input.thumbPath;

      // elimina le cartelle dei file modificati (verrano ricreate successivamente).
      if (isThumbDeleted || isNewThumb) {
        const pillThumbDir = toServerPath(thumbDir, pillDirName);
        if (existsSync(pillThumbDir)) rmSync(pillThumbDir, { recursive: true });
      }
      if (isNewContent) {
        const pillContentDir = toServerPath(contentDir, pillDirName);
        if (existsSync(pillContentDir)) rmSync(pillContentDir, { recursive: true });
      }

      // sposta i file caricati nella cartella ufficiale.
      let thumbPath = input.thumbPath ?? "";
      if (input.thumbPath && isNewThumb) {
        const thumbMove: MoveOperation = {
          from: toServerPath(input.thumbPath),
          to: toServerPath(thumbDir, pillDirName, basename(input.thumbPath)),
        };

        console.log(thumbMove);

        const thumbMoved = execFileMoves(thumbMove).at(0);
        thumbPath = thumbMoved ? toUrlPath(thumbMoved) : "";
      }

      let content: [string, ...string[]] = input.content;
      if (isNewContent) {
        const contentMoves = input.content.map((contentPath): MoveOperation => {
          return {
            from: toServerPath(contentPath),
            to: toServerPath(contentDir, pillDirName, basename(contentPath)),
          };
        });

        console.log(contentMoves);

        const contentMoved = execFileMoves(...contentMoves).map(toUrlPath);
        content = [contentMoved.shift() ?? "", ...contentMoved];
      }

      // predisposizione righe conttenuto per DB.
      const contentRows = content.map((c) => {
        return { path: c };
      });

      // aggiornamento pillola.
      const updatedPill = await tx.pill.update({
        data: {
          title: input.title,
          description: input.description,
          thumbPath: thumbPath,
          PillContent: {
            deleteMany: { pillId: input.id },
            createMany: { data: contentRows },
          },
        },
        where: {
          id: input.id,
        },
      });

      // restituisce la pillola modificata.
      return {
        ...updatedPill,
        content,
      };
    });
  });

// ------------------------------------------------------------------------------------------------

/**
 * Elimina una pillola.
 */
const execDelete = adminAPIProcedure
  .input(adminPillApiDeleteSchema)
  .mutation(async ({ ctx, input }): Promise<PillAdminData> => {
    const { db } = ctx;

    // si esegue l'operazione in una transazione. Se avviene un errore nello successivo
    // spostamento dei file, il precente record inserito/modificato in DB viene annullato.
    // la funzione "execFileMoves" elimina anche i file già copiati in caso di errore.

    return await db.$transaction(async (tx): Promise<PillAdminData> => {
      // eliminazione pillola da DB.
      const deletedPill = await tx.pill.delete({
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          title: true,
          description: true,
          thumbPath: true,
          PillContent: {
            select: {
              path: true,
            },
          },
        },
        where: { id: input.id },
      });

      // operazioni sui file.
      // const allMoves: MoveOperation[] = [];
      const { uploadDir: thumbDir } = uploadPillThumbConfig;
      const { uploadDir: contentDir } = uploadPillContentConfig;
      const pillDirName = input.id.toString().padStart(3, "0");

      // elimina del tutto le cartelle dei file.
      const pillThumbDir = toServerPath(thumbDir, pillDirName);
      if (existsSync(pillThumbDir)) rmSync(pillThumbDir, { recursive: true });

      const pillContentDir = toServerPath(contentDir, pillDirName);
      if (existsSync(pillContentDir)) rmSync(pillContentDir, { recursive: true });

      // estrae i vecchi contenuti della pillola elimanta.
      const deletedContent = deletedPill.PillContent.map((contentTable) => contentTable.path);
      const content: [string, ...string[]] = [deletedContent.shift() ?? "", ...deletedContent];

      return {
        ...deletedPill,
        content,
      };
    });
  });

// ------------------------------------------------------------------------------------------------

/**
 * definizione route "adminPill"
 */
export const adminPillApi = createAPIRouter({
  list,
  get,
  create,
  update,
  delete: execDelete,
});

// ------------------------------------------------------------------------------------------------
