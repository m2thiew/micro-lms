/**
 * src/backend/utils/upload.ts
 *
 * funzioni utili a maneggiare i percorsi dei file sul server.
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import { sanitizeFileName } from "@/shared/utils/file";
import { buildRelativePath } from "@/shared/utils/url";
import path, { resolve } from "path";

// ------------------------------------------------------------------------------------------------

/**
 * Percorsi standard per l'upload dei file.
 */

export const UPLOAD_TMP_DIR = "/tmp/" as const;
export const UPLOAD_BASE_DIR = "public/" as const;
export const SESSION_DIR_NAME = "session" as const;

// ------------------------------------------------------------------------------------------------

/**
 * Concatena tutti gli elmenti e restituisce il percorso ottenuto che punti allo spazio di
 * archiviazione file sul server.
 * @param paths uno o più cartelle / percorsi da concatenare
 * @returns percorso di archiviazione file sul server
 */
export const buildServerStoragePath = (
  ...args: (string | number | symbol | undefined)[]
): string => {
  // converte in stringa gli argomenti passati
  const stringArgs = args.map((a) => (a ? a.toString() : ""));

  // rimuove gli elmenti vuoti.
  const validStrings = stringArgs.filter((s) => s.length > 0);

  // unisce tutte le stringhe, quindi le divide di nuovo per ottenere eventuali path
  // che erano stati passati già concatenati.
  const joinedArgs = validStrings.join(path.sep);
  const allPaths = joinedArgs.split(path.sep);

  // pulisce i cartteri non consentiti da ogni path.
  const sanitizedPaths = allPaths.map(sanitizeFileName);

  // se non già presente, aggiunge all'inizio la cartella base per i file salvati sul server.
  const baseDir = UPLOAD_BASE_DIR.replace("/", "");
  if (!sanitizedPaths.includes(baseDir)) sanitizedPaths.splice(0, 0, baseDir);

  return path.resolve(sanitizedPaths.join(path.sep));
};

// ------------------------------------------------------------------------------------------------

/**
 * Restituisce il percoso alla cartella per i file temporanei del server.
 * @param paths uno o più cartelle / percorsi da concatenare
 * @returns percorso temporaneo sul server
 */
export const buildServerTmpPath = (...args: (string | number | symbol | undefined)[]): string => {
  // converte in stringa gli argomenti passati
  const stringArgs = args.map((a) => (a ? a.toString() : ""));

  // rimuove gli elmenti vuoti.
  const validStrings = stringArgs.filter((s) => s.length > 0);

  // unisce tutte le stringhe, quindi le divide di nuovo per ottenere eventuali path
  // che erano stati passati già concatenati.
  const joinedArgs = validStrings.join(path.sep);
  const allPaths = joinedArgs.split(path.sep);

  // pulisce i cartteri non consentiti da ogni path.
  const sanitizedPaths = allPaths.map(sanitizeFileName);

  // se non già presente, aggiunge all'inizio la cartella base per i file temporanei sul server.
  const baseDir = UPLOAD_TMP_DIR.replace("/", "");
  if (!sanitizedPaths.includes(baseDir)) sanitizedPaths.splice(0, 0, baseDir);

  return path.resolve(sanitizedPaths.join(path.sep));
};

// ------------------------------------------------------------------------------------------------

/**
 * Restistuisce il nome della cartella dove temporaneamente salvare i nuovi file di upload
 * @param name nome del campo di input
 * @param session identificativo sessione di upload
 * @returns nome cartella per salvare temporaneamente i file.
 */
export const getSessionDirName = (name: string, session: string): string => {
  return `${name}-${session}`;
};

// ------------------------------------------------------------------------------------------------

/**
 * Dato un percorso di un file su un server, restituisce lo stesso percorso per essere
 * usato nelle url
 * @param serverPath percorso a un file su un server
 * @returns path relativo del percorso
 */
export const returnUrlPath = (serverPath: string) => {
  const resolvedBasePath = path.resolve(UPLOAD_BASE_DIR);

  // rimove i riferimenti alla cartella "public" del server.
  const remove01 = serverPath.replace(resolvedBasePath, "");
  const remove02 = remove01.replace(UPLOAD_BASE_DIR, "");

  // provvede a rimuovere eventuali doppi slash.
  const noDoubleSlash = remove02.replace(/\/{2,}/g, "/");

  // se non già presente, aggiunge lo slash "/" iniziale.
  const firstChar = noDoubleSlash.at(0);
  const startSlash = firstChar != "/" ? `/${noDoubleSlash}` : noDoubleSlash;

  return startSlash;
};

// ------------------------------------------------------------------------------------------------
