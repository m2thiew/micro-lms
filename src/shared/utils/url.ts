/**
 * src/shared/utils/url.ts
 *
 * funzioni per le url della applicazione.
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

// ------------------------------------------------------------------------------------------------

/**
 * url con il dominio della applicazione.
 */
export const domainUrl = `http://localhost:${process.env.PORT ?? 3000}`;

// ------------------------------------------------------------------------------------------------

/**
 * concatena i percorsi con uno "/" e restituisce quindi un percorso relativo.
 * @param paths percorsi da concatenare
 * @returns percorsi concatenati
 */
export const buildRelativePath = (...paths: (string | undefined)[]): string => {
  const validPaths = paths.filter((path) => !!path);

  return validPaths.join("/").replace(/\/{2,}/g, "/");
};

// ------------------------------------------------------------------------------------------------

/**
 * restituisce la url completa ad un file pubblico salvato sul server.
 * @param paths uno o più cartelle / percosi da concatenare
 * @returns url al percorso passato
 */
export const buildPublicUrl = (...paths: (string | undefined)[]): string => {
  return domainUrl + "/" + paths.join("/");
};
