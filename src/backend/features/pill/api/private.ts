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
import {
  privatePillApiGetSchema,
  privatePillApiSetTrackSchema,
  type PillPublicData,
} from "@/shared/features/pill/schema";
import { type TrackPrivateData } from "@/shared/features/subscription/schema";
import { TRPCError } from "@trpc/server";
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
  .input(privatePillApiGetSchema)
  .query(async ({ ctx, input }): Promise<PillPublicData> => {
    const { db, learner } = ctx;

    if (!learner.pillsId.includes(input.id)) throw new TRPCError({ code: "UNAUTHORIZED" });

    const pill = (await fetchPillsPublicData(db, input.id)).at(0);
    if (!pill) throw new TRPCError({ code: "NOT_FOUND" });

    return pill;
  });

// ------------------------------------------------------------------------------------------------

/**
 *
 */
const setTrack = loggedInAPIProcedure
  .input(privatePillApiSetTrackSchema)
  .mutation(async ({ ctx, input }): Promise<TrackPrivateData> => {
    const { db, learner } = ctx;

    if (!learner.pillsId.includes(input.id)) throw new TRPCError({ code: "UNAUTHORIZED" });

    // inserimento/track di visualizzazione pillola.
    const trackRow = await db.track.upsert({
      create: {
        learnerId: learner.id,
        pillId: input.id,
      },
      update: {
        learnerId: learner.id,
        pillId: input.id,
      },
      where: {
        LearnerPillUnique: { learnerId: learner.id, pillId: input.id },
      },
    });

    const track: TrackPrivateData = {
      learnerId: trackRow.learnerId,
      pillId: trackRow.pillId,
      viewedAt: trackRow.createdAt,
    };

    return track;
  });

// ------------------------------------------------------------------------------------------------

/**
 * Definizione route "privatePill"
 */
export const privatePillApi = createAPIRouter({
  list,
  get,
  setTrack,
});
// ------------------------------------------------------------------------------------------------
