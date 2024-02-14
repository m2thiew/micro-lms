/**
 * src/shared/utils/file.ts
 *
 * funzioni utili per la gestione dei file.
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

// ------------------------------------------------------------------------------------------------

/**
 * Sostituzioni per pulire i caratteri non consentiti nei nomi dei file.
 * @param filename  nome del file originale
 * @returns   nome del file ripulito
 */
export const sanitizeFileName = (filename: string): string => {
  // sostituisce tutti gli spazi con un trattino
  const noSpaces = filename.replace(/\s\.\_\+\*/g, "-");

  // seleziona e cancella tutti i caratteri che non siano lettere, numeri e trattini (-).
  const onlyChars = noSpaces.replace(/[^A-z0-9\-]/g, "");

  // rimuove eventuali trattini doppi.

  const noDobleDash = onlyChars.replace(/\-{2,}/g, "-");

  // restituisce il nome convertito in minuscolo
  return noDobleDash.toLocaleLowerCase();
};
