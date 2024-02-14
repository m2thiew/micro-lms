/**
 * src/backend/lib/upload.ts
 *
 * configurazioni di upload per il server.
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import path, { resolve } from "path";

// ------------------------------------------------------------------------------------------------

/**
 * Percorsi standard per l'upload dei file.
 */

export const UPLOAD_TMP_DIR = "/tmp/" as const;
export const UPLOAD_DEST_DIR = "public/" as const;

// ------------------------------------------------------------------------------------------------

/**
 * Restituisce il percoso alla cartella per archiviare i file sul server.
 * @param paths uno o più cartelle / percorsi da concatenare
 * @returns percorso di archiviazione file sul server
 */
export const buildServerStoragePath = (...paths: string[]): string => {
  return path.resolve(UPLOAD_DEST_DIR, ...paths);
};

// ------------------------------------------------------------------------------------------------

/**
 * Restituisce il percoso alla cartella per i file temporanei del server.
 * @param paths uno o più cartelle / percorsi da concatenare
 * @returns percorso temporaneo sul server
 */
export const buildServerTmpPath = (...paths: string[]): string => {
  return path.resolve(UPLOAD_TMP_DIR, ...paths);
};
