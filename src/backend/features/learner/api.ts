/**
 * src/backend/features/learner/api.ts
 *
 * Chiamate API per la gestione dei learner.
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import { adminAPIProcedure } from "@/backend/lib/trpc/procedures";
import { createAPIRouter } from "@/backend/lib/trpc/server";
import { type Learner } from "@prisma/client";
import { setTimeout } from "timers/promises";

// dati parziali del learner esposti in elenco.
type LearnerListData = Pick<Learner, "id" | "name" | "surname" | "email">;

// ------------------------------------------------------------------------------------------------

/**
 * Restituisce l'elenco dei learner (solo i dati base).
 */

const getLearnerList = adminAPIProcedure.query(async ({ ctx }): Promise<LearnerListData[]> => {
  const { db } = ctx;

  // await setTimeout(5000);
  // throw new Error("ERRRRR");

  // query per recuperare l'elenco completo dei learner.
  const learners = await db.learner.findMany({
    select: {
      id: true,
      name: true,
      surname: true,
      email: true,
    },
  });

  return learners;
});

// ------------------------------------------------------------------------------------------------

export const learnerApi = createAPIRouter({
  getLearnerList,
});
