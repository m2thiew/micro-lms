/**
 * src/shared/utils/void.ts
 *
 * funzioni vuote (usate come valori di default nei contesti)
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

// ------------------------------------------------------------------------------------------------

export const doNothingSync = (): void => {
  /* nessuna azione */
};

export const doNothingAsync = (): Promise<void> => {
  return new Promise<void>(doNothingSync).catch(doNothingSync);
};
