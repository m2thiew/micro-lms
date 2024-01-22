/**
 * src/shared/utils/async.ts
 *
 * Funzioni utili per gestire/passare funzioni async quando in realtà l'argomento di una funzione
 * si aspetta codice non async
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import { type SyntheticEvent } from "react";

// Definizione di handler (funzioni usate sugli eventi "onClick", "onChange", "onSubmit", etc.)

type AsyncHandler = (event: SyntheticEvent | undefined) => Promise<void>;
type SyncHandler = (event: SyntheticEvent | undefined) => void;

// ------------------------------------------------------------------------------------------------

/**
 * Data una funzione "async" per gestire un evento (p.e. "onSubmit", "onClick"), restiutisce una funzione
 * sincrona che esegue la funzione originale.
 * Questo codice nasce principalmente per usare "react-hook-form" nel campo "onSubmit".
 *
 * @param asyncHandler handler async da eseguire. Può essere presente il parametro "event"
 */

export const returnSyncHandler = (asyncHandler: AsyncHandler): SyncHandler => {
  const syncHandler: SyncHandler = (event: SyntheticEvent | undefined): void => {
    asyncHandler(event).catch((error) => {
      console.error(error);
    });
  };

  return syncHandler;
};
