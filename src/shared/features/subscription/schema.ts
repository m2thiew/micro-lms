/**
 * src/shared/features/subscription/schema.ts
 *
 * definizione tipi e campi per le assegnazioni pillole
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import { z } from "zod";

// ------------------------------------------------------------------------------------------------

export const subscriptionFields = {
  learnerId: z.number().int(),
  pillsId: z.array(z.number().int()),
} as const;

const { learnerId, pillsId } = subscriptionFields;

// ------------------------------------------------------------------------------------------------

export const subscriptionAdminDataSchema = z.object({
  learnerId,
  pillsId,
});
export type SubscriptionAdminData = z.infer<typeof subscriptionAdminDataSchema>;

// public.
export const subscriptionSchema = subscriptionAdminDataSchema;
export type Subscription = SubscriptionAdminData;

// ------------------------------------------------------------------------------------------------

export const adminSubscriptionApiGetSchema = z.object({
  learnerId,
});
export type AdminSubscriptionApiGetInput = z.infer<typeof adminSubscriptionApiGetSchema>;

// ------------------------------------------------------------------------------------------------

export const adminSubscriptionApiSetSchema = z.object({
  learnerId,
  pillsId,
});
export type AdminSubscriptionApiSetInput = z.infer<typeof adminSubscriptionApiSetSchema>;

// ------------------------------------------------------------------------------------------------

export const adminSubscriptionFormSetSchema = z.object({
  learnerId,
  pillsId,
});
export type AdminSubscriptionFormSetInput = z.infer<typeof adminSubscriptionFormSetSchema>;

// ------------------------------------------------------------------------------------------------
