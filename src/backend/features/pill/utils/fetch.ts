/**
 * src/backend/features/pill/utils/fetch.ts
 *
 * funzioni per recuperare i dati delle pillole da DB.
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import {
  contentRowToContent,
  pillAdminDataSchema,
  pillPublicDataSchema,
  type PillAdminData,
  type PillPublicData,
} from "@/shared/features/pill/schema";
import { type PrismaClient } from "@prisma/client";
import { type PrismaClientOptions } from "@prisma/client/runtime/library";

type DB = PrismaClient;

type DBTransaction = Omit<
  PrismaClient<PrismaClientOptions, never>,
  "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
>;

type DBInterface = DB | DBTransaction;

// ------------------------------------------------------------------------------------------------

/**
 * Recupera tutti, uno o alcuni dati delle pillole, convertendo i dati nel formato usato nella app.
 * @param db connessione al DB
 * @param ids (opzionale) se specificato, recupera solo i learner con tali id
 * @returns dati pillole per gli admin
 */
export const fetchPillsAdminData = async (
  db: DBInterface,
  id?: number | number[],
): Promise<PillAdminData[]> => {
  // cosrtruzione where
  const idList: number[] = id instanceof Array ? id : [id ?? 0];
  const where = id !== undefined ? { id: { in: idList } } : undefined;

  // recupero righe DB
  const pillRows = await db.pill.findMany({
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
      title: true,
      description: true,
      thumbPath: true,
      PillContent: {
        select: { path: true },
      },
    },
    where: where,
  });

  // conversione da formato DB a formato della app.
  const pills: PillAdminData[] = pillRows.map((pillRow): PillAdminData => {
    const contentRows = pillRow.PillContent;
    const contentList = contentRows.map((contentRow) => contentRowToContent.parse(contentRow));

    // deve sempre essere presente almeno un contenuto per ogni pillola.
    const firstContent = contentList.shift();
    if (!firstContent) throw new Error(`pill #${pillRow.id} has no content`);
    const content = [firstContent, ...contentList];

    return pillAdminDataSchema.parse({ ...pillRow, content });
  });

  return pills;
};

// ------------------------------------------------------------------------------------------------

/**
 * Recupera tutti, uno o alcuni dati delle pillole, convertendo i dati nel formato usato nella app.
 * @param db connessione al DB
 * @param ids (opzionale) se specificato, recupera solo i learner con tali id
 * @returns dati pillole visibili a tutti
 */
export const fetchPillsPublicData = async (
  db: DBInterface,
  id?: number | number[],
): Promise<PillPublicData[]> => {
  // cosrtruzione where
  const idList: number[] = id instanceof Array ? id : [id ?? 0];
  const where = id !== undefined ? { id: { in: idList } } : undefined;

  // recupero righe DB
  const pillRows = await db.pill.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      thumbPath: true,
      PillContent: {
        select: { path: true },
      },
    },
    where: where,
  });

  // conversione da formato DB a formato della app.
  const pills: PillPublicData[] = pillRows.map((pillRow): PillPublicData => {
    const contentRows = pillRow.PillContent;
    const contentList = contentRows.map((contentRow) => contentRowToContent.parse(contentRow));

    // deve sempre essere presente almeno un contenuto per ogni pillola.
    const firstContent = contentList.shift();
    if (!firstContent) throw new Error(`pill #${pillRow.id} has no content`);
    const content = [firstContent, ...contentList];

    return pillPublicDataSchema.parse({ ...pillRow, content });
  });

  return pills;
};

// ------------------------------------------------------------------------------------------------
