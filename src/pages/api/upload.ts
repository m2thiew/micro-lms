/**
 * src/pages/api/upload.ts
 *
 * gestisce l'upload di file sul server
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import { UPLOAD_TMP_DIR, buildServerStoragePath } from "@/backend/lib/upload";
import { mime } from "@/shared/lib/mime";
import { uploadConfigs, type UploadConfig, type UploadedFile } from "@/shared/lib/upload";
import { sanitizeFileName } from "@/shared/utils/file";
import { buildRelativePath } from "@/shared/utils/url";
import { default as formidable } from "formidable";
import { copyFileSync, existsSync, mkdirSync, unlinkSync } from "fs";
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
const handleFileUpload = (
  tmpFile: formidable.File,
  config: UploadConfig,
  tmpDir?: string,
): UploadedFile => {
  // pulisce il nome originale del file oppure ne calcola uno nuovo.
  const { name } = path.parse(tmpFile.originalFilename ?? "");
  const now = DateTime.now();
  const dateName = now.toFormat("yyyyMMdd-HHmmss");

  // calcolo del nuovo nome del file.
  const ext = mime.getExtension(tmpFile.mimetype ?? "");
  const newFilename = `${name ? sanitizeFileName(name) : dateName}.${ext}`;

  // calcolo percorso di destinazione del file.
  const destinationDirRelativePath = buildRelativePath(config.uploadDir, tmpDir);

  const newFileServerDir = buildServerStoragePath(destinationDirRelativePath);
  const newFileServerPath = buildServerStoragePath(destinationDirRelativePath, newFilename);
  const newFileRelativePath = buildRelativePath(destinationDirRelativePath, newFilename);

  console.log(destinationDirRelativePath, newFileServerDir, newFileServerPath, newFileRelativePath);

  try {
    // crea la eventuale cartella richiesta.
    if (!existsSync(newFileServerDir)) {
      mkdirSync(newFileServerDir, { recursive: true });
    }

    // copia il file nel percorso di destinazione.
    copyFileSync(tmpFile.filepath, newFileServerPath);

    // cancella il file temporaneo.
    unlinkSync(tmpFile.filepath);

    // restituire le informazioni del nuovo file caricato.
    const newUploadedFile: UploadedFile = {
      filename: newFilename,
      path: newFileRelativePath,
      mimetype: tmpFile.mimetype ?? undefined,
      size: tmpFile.size,
    };

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
    console.log(req.body);
    // parse del corpo della richiesta.
    const promise = form.parse(req);
    console.log(promise);
    const parsed = await promise;

    console.log(parsed);

    // separazione campi standard form VS. file caricati con form
    const [fields, files] = parsed;

    // recupera la configurazione da usare per l'upload.
    const configId = fields.configId?.at(0);
    if (!configId) throw new Error("configId not found");

    console.log(configId, uploadConfigs);

    const config = uploadConfigs[configId];
    if (!config) throw new Error(`configId "${configId}" is not valid`);

    console.log(configId);

    // recupera l'eventuale cartella temporanea da creare.
    const tmpDirValue = fields.tmpDir?.at(0);
    const tmpDir = tmpDirValue ? sanitizeFileName(tmpDirValue) : undefined;

    console.log(configId, config, tmpDir);

    // i file da caricare devono essere indicati all'interno dell'input "files"
    if (files.files) {
      // esclude i file che non previsti dalla configurazione.

      const validMimes = config.accept.map((accept) => accept.replace("/*", "/"));

      const validFiles = files.files.filter((file) => {
        const acceptedMime = validMimes.find((validMime) => file.mimetype?.includes(validMime));

        return acceptedMime ? file : null;
      });

      // salva singolarmente ogni file.
      const uploadedFiles = validFiles.map((file) => {
        return handleFileUpload(file, config, tmpDir);
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
