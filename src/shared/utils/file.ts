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
 * Sostituzioni per pulire i caratteri non consentiti nei "basename" (nome + estensione) dei file.
 * @param basename  nome del file originale (N.B. deve includere anche l'eventuale estensione)
 * @returns   nome del file ripulito
 */
export const sanitizeBasename = (basename: string): string => {
  // divide il nome dalla estensione.
  const dotSplit = basename.split(".");

  // si rimuove l'estensione (l'ultima parte recuperata dividendo per il .)
  const ext = dotSplit.length > 1 ? dotSplit.pop() : undefined;
  const filename = dotSplit.join(".");

  // sostituisce tutti gli spazi con un trattino
  const noSpaces = filename.replace(/[\s\.\_\+\*]/g, "-");

  // seleziona e cancella tutti i caratteri che non siano lettere, numeri e trattini (-).
  const onlyChars = noSpaces.replace(/[^A-z0-9\-]/g, "");

  // rimuove eventuali trattini doppi.
  const noDobleDash = onlyChars.replace(/\-{2,}/g, "-");

  // converte in minuscolo il nome.
  const lowerCase = noDobleDash.toLocaleLowerCase();

  // riaggiunge l'estensione.
  const restoredExtension = ext ? `${lowerCase}.${ext}` : lowerCase;

  return restoredExtension;
};
