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

import { type BaseSyntheticEvent } from "react";

// Definizione di handler (funzioni usate sugli eventi "onClick", "onChange", "onSubmit", etc.)

export type AsyncHandler = (
  e?: BaseSyntheticEvent<object, unknown, unknown> | undefined,
) => Promise<void>;
export type SyncHandler = (e?: BaseSyntheticEvent<object, unknown, unknown> | undefined) => void;

// ------------------------------------------------------------------------------------------------

/**
 * Data una funzione "async" per gestire un evento (p.e. "onSubmit", "onClick"), restiutisce una funzione
 * sincrona che esegue la funzione originale.
 * Questo codice nasce principalmente per usare "react-hook-form" nel campo "onSubmit".
 *
 * @param asyncHandler handler async da eseguire. Può essere presente il parametro "event"
 */
export const returnSyncHandler = (asyncHandler: AsyncHandler): SyncHandler => {
  const syncHandler: SyncHandler = (
    e?: BaseSyntheticEvent<object, unknown, unknown> | undefined,
  ): void => {
    asyncHandler(e).catch((error) => {
      console.error(error);
    });
  };

  return syncHandler;
};

// ------------------------------------------------------------------------------------------------

/**
 * funzione vuota per i "catch()" delle Promise
 * @param err errore della Promise
 */
export const voidCatch = (err: unknown): void => {
  console.error(err);
};
