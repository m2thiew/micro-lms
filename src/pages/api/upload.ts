/**
 * src/pages/api/upload.ts
 *
 * gestisce l'upload di file sul server
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import {
  SESSION_DIR_NAME,
  UPLOAD_TMP_DIR,
  getSessionDirName,
  toServerPath,
  toUrlPath,
} from "@/backend/utils/upload";
import { mime } from "@/shared/lib/mime";
import { uploadConfigs, type UploadConfig, type UploadedFile } from "@/shared/lib/upload";
import { sanitizeBasename } from "@/shared/utils/file";
import { buildRelativePath } from "@/shared/utils/url";
import { default as formidable } from "formidable";
import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync, statSync, unlinkSync } from "fs";
import { DateTime } from "luxon";
import { type NextApiRequest, type NextApiResponse } from "next";
import path from "path";
import { setTimeout } from "timers/promises";

// ------------------------------------------------------------------------------------------------

/**
 * Gestisce il salvataggio lato server di un nuovo file.
 * @param tmpFile   file caricato tramite form
 * @param config  configurazione dell'upload
 * @param tmpDir  eventuale cartella aggiuntiva da creare per l'upload
 * @returns informazioni del file caricato
 */
const handleFileUpload = (tmpFile: formidable.File, destinationDir: string): UploadedFile => {
  // pulisce il nome originale del file oppure ne calcola uno nuovo.
  const sanitizedName = sanitizeBasename(tmpFile.originalFilename ?? "");
  const { name } = path.parse(sanitizedName);
  const now = DateTime.now();
  const dateName = now.toFormat("yyyyMMdd-HHmmss");

  // calcolo del nuovo nome del file.
  const ext = mime.getExtension(tmpFile.mimetype ?? "");
  const newBasename = `${name ? name : dateName}.${ext}`;

  // calcolo percorso del file sul server & percorso relativo (per url)
  const newFileServerPath = toServerPath(destinationDir, newBasename);

  console.log(destinationDir, newFileServerPath);

  try {
    // copia il file nel percorso di destinazione.
    copyFileSync(tmpFile.filepath, newFileServerPath);

    // cancella il file temporaneo.
    unlinkSync(tmpFile.filepath);

    // restituire le informazioni del nuovo file caricato.
    const newUploadedFile: UploadedFile = {
      filename: newBasename,
      path: toUrlPath(newFileServerPath),
      mimetype: tmpFile.mimetype ?? undefined,
      size: tmpFile.size,
    };

    console.log(newUploadedFile);

    return newUploadedFile;
  } catch (err) {
    // pulizia file non caricato
    if (existsSync(tmpFile.filepath)) {
      unlinkSync(tmpFile.filepath);
    }
    if (existsSync(newFileServerPath)) {
      unlinkSync(newFileServerPath);
    }
    // rilancio eccezione.
    throw err;
  }
};

// ------------------------------------------------------------------------------------------------

/**
 * Esegue il parse del contneuto del form e gestisce l'upload dei file.
 * @param req richiesta HTTP
 * @param res risposta HTTP
 */
const processUploadedFiles = async (req: NextApiRequest, res: NextApiResponse) => {
  // debugger;
  const form = formidable({
    uploadDir: UPLOAD_TMP_DIR,
  });

  try {
    // parse del corpo della richiesta.
    const promise = form.parse(req);

    const parsed = await promise;

    // separazione campi standard form VS. file caricati con form
    const [fields, files] = parsed;

    // recupera la configurazione da usare per l'upload.
    const configId = fields.configId?.at(0);
    if (!configId) throw new Error("configId not found");

    const config = uploadConfigs[configId];
    if (!config) throw new Error(`configId "${configId}" is not valid`);

    // recupera il nome del campo.
    const name = fields.name?.at(0);
    if (!name) throw new Error("name not found");

    // recupera la sessione.
    const session = fields.session?.at(0);
    if (!session) throw new Error("session not found");

    // Provvede a creare e/o a svuotare la cartelle temporanea in cui posizionare i file.
    const sessionDirName = getSessionDirName(name, session);
    const sessionDirServerPath = toServerPath(SESSION_DIR_NAME, sessionDirName);

    // crea la cartella di sessione upload.
    if (!existsSync(sessionDirServerPath)) {
      mkdirSync(sessionDirServerPath, { recursive: true });
    }

    // svuota i file precedentemente caricati dalla cartella di sessione.
    readdirSync(sessionDirServerPath).forEach((sessionFile) => {
      const pathToFile = path.join(sessionDirServerPath, sessionFile);
      rmSync(pathToFile, { recursive: true });
    });

    // elimina le altre cartelle di sessione più vecchie di due ore.
    const sessionBaseDirServerPath = toServerPath(SESSION_DIR_NAME);
    const twoHoursAgo = DateTime.now().minus({ hour: 2 });

    readdirSync(sessionBaseDirServerPath).forEach((sessionDir) => {
      if (sessionDir != sessionDirName) {
        const pathToDir = path.join(sessionBaseDirServerPath, sessionDir);

        const stat = statSync(pathToDir);
        const birthTime = DateTime.fromMillis(stat.birthtimeMs);

        if (birthTime < twoHoursAgo) {
          rmSync(pathToDir, { recursive: true });
        }
      }
    });

    if (files.files) {
      // i file da caricare devono essere indicati all'interno dell'input "files"
      // esclude i file che non previsti dalla configurazione.

      const validMimes = config.accept.map((accept) => accept.replace("/*", "/"));

      const validFiles = files.files.filter((file) => {
        const acceptedMime = validMimes.find((validMime) => file.mimetype?.includes(validMime));

        return acceptedMime ? file : null;
      });

      // salva singolarmente ogni file.
      const uploadedFiles = validFiles.map((file) => {
        return handleFileUpload(file, sessionDirServerPath);
      });

      // restituisce le informazioni dei file caricati.
      res.status(200).json(uploadedFiles);
    } else {
      // restiusce un array vuoto (nessun file da caricare).
      res.status(200).json([]);
    }
  } catch (err) {
    // si è verificato un errore.
    console.log(err);
    res.status(500).send(err);
  }
};

// ------------------------------------------------------------------------------------------------

/**
 * Disattiva il parse di NextJS (in quanto viene eseguito dalla liberia "formmidable")
 */
export const config = {
  api: {
    bodyParser: false,
  },
  maxDuration: 30, // secondi
};

export default processUploadedFiles;
