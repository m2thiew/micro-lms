/**
 * src/backend/features/learner/api/learner.ts
 *
 * chiamate API per i learner loggati
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import { loggedInAPIProcedure } from "@/backend/lib/trpc/procedures";
import { createAPIRouter } from "@/backend/lib/trpc/server";
import { type LearnerPublicData } from "@/shared/features/learner/schema";

// ------------------------------------------------------------------------------------------------

/**
 * Restituisce i dati del learner loggato.
 */
const get = loggedInAPIProcedure.query(({ ctx }): LearnerPublicData => {
  const { learner } = ctx;
  return learner;
});

// ------------------------------------------------------------------------------------------------

/**
 * Definizione route "learner".
 */

export const learnerApi = createAPIRouter({
  get,
});

// ------------------------------------------------------------------------------------------------
