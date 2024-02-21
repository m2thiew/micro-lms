/**
 * src/backend/features/subscription/api/admin.ts
 *
 * API endpoint per le assegnazioni pillole
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import { adminAPIProcedure } from "@/backend/lib/trpc/procedures";
import { createAPIRouter } from "@/backend/lib/trpc/server";
import {
  adminSubscriptionApiGetSchema,
  adminSubscriptionApiSetSchema,
  type SubscriptionAdminData,
} from "@/shared/features/subscription/schema";

// ------------------------------------------------------------------------------------------------

const get = adminAPIProcedure
  .input(adminSubscriptionApiGetSchema)
  .query(async ({ ctx, input }): Promise<SubscriptionAdminData> => {
    const { db } = ctx;

    const pillsIdRows = await db.subscription.findMany({
      where: { learnerId: input.learnerId },
    });

    const pillsId = pillsIdRows.map((pillRow) => pillRow.pillId);

    return {
      learnerId: input.learnerId,
      pillsId,
    };
  });

// ------------------------------------------------------------------------------------------------

const set = adminAPIProcedure
  .input(adminSubscriptionApiSetSchema)
  .mutation(async ({ ctx, input }): Promise<SubscriptionAdminData> => {
    const { db } = ctx;

    return await db.$transaction(async (tx): Promise<SubscriptionAdminData> => {
      // cancella le vecchie assegnazioni.
      await tx.subscription.deleteMany({
        where: { learnerId: input.learnerId },
      });

      // inserisce le nuove assegnazioni passate.
      const subscriptionRows = input.pillsId.map((pillId) => {
        return { learnerId: input.learnerId, pillId: pillId };
      });

      const newSubscription = await tx.subscription.createMany({
        data: subscriptionRows,
      });

      return {
        learnerId: input.learnerId,
        pillsId: input.pillsId,
      };
    });
  });

// ------------------------------------------------------------------------------------------------

export const adminSubscription = createAPIRouter({
  get,
  set,
});

// ------------------------------------------------------------------------------------------------
