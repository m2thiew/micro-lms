/**
 * src/backend/features/pill/api/learner.ts
 *
 * chiamate API per le pillole dei learner loggati.
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import { loggedInAPIProcedure } from "@/backend/lib/trpc/procedures";
import { createAPIRouter } from "@/backend/lib/trpc/server";
import { learnerPillApiGetSchema, type PillPublicData } from "@/shared/features/pill/schema";
import { TRPCError } from "@trpc/server";
import input from "postcss/lib/input";
import { fetchPillsPublicData } from "../utils/fetch";

// ------------------------------------------------------------------------------------------------

/**
 * Restituisce i dati delle pillole a cui il learner è iscritto.
 */
const list = loggedInAPIProcedure.query(async ({ ctx }): Promise<PillPublicData[]> => {
  const { db, learner } = ctx;

  const pills = fetchPillsPublicData(db, learner.pillsId);

  return pills;
});

// ------------------------------------------------------------------------------------------------

/**
 * Restituisce i dati di una pillola a cui il learner è iscritto.
 */
const get = loggedInAPIProcedure
  .input(learnerPillApiGetSchema)
  .query(async ({ ctx, input }): Promise<PillPublicData> => {
    const { db, learner } = ctx;

    if (!learner.pillsId.includes(input.id)) throw new TRPCError({ code: "UNAUTHORIZED" });

    const pill = (await fetchPillsPublicData(db, input.id)).at(0);
    if (!pill) throw new TRPCError({ code: "NOT_FOUND" });

    return pill;
  });

// ------------------------------------------------------------------------------------------------

/**
 * Definizione route "learnerPill"
 */
export const learnerPillApi = createAPIRouter({
  list,
  get,
});
// ------------------------------------------------------------------------------------------------
