/**
 * src/shared/features/learner/schema.ts
 *
 * Definizione campi, tipi e input per i dati learner
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import { z } from "zod";
import {
  subscriptionFields,
  trackPrivateData,
  type TrackPrivateData,
} from "../subscription/schema";

// ------------------------------------------------------------------------------------------------

/**
 * Definizione campi con relativi vincoli.
 */

export const learnerFields = {
  id: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  name: z.string().min(3).trim(),
  surname: z.string().min(3).trim(),
  email: z.string().email().trim(),
  role: z.enum(["LEARNER", "ADMIN"]),

  // password in chiaro
  password: z.string().min(8).trim(),
} as const;
export type LearnerFields = typeof learnerFields;

const { id, createdAt, updatedAt, name, surname, email, password, role } = learnerFields;

// conversione delle righe "Subscription" presenti in DB in oggetto "pillsId"

export const subscriptionRow = z.object({
  pillId: z.number().int(),
});
export type SubscriptionRow = z.infer<typeof subscriptionRow>;

export const subscriptionRowToPillId = subscriptionRow.transform((subRow): number => {
  return subRow.pillId;
});

// conversione delle righe "Track" presenti in DB in oggetto "tracks"

export const trackRow = z.object({
  createdAt: z.coerce.date(),
  learnerId: z.number().int(),
  pillId: z.number().int(),
});
export type TrackRow = z.infer<typeof trackRow>;

export const trackRowToTrack = trackRow.transform((trackRow): TrackPrivateData => {
  return { pillId: trackRow.pillId, learnerId: trackRow.learnerId, viewedAt: trackRow.createdAt };
});

// ------------------------------------------------------------------------------------------------

/**
 * Dati pubblici di un learner.
 */

export const learnerPublicDataSchema = z.object({
  id,
  name,
  surname,
  email,
  pillsId: subscriptionFields.pillsId,
  tracks: z.array(trackPrivateData),
});
export type LearnerPublicData = z.infer<typeof learnerPublicDataSchema>;

// abbreviati.
export const learnerSchema = learnerPublicDataSchema;
export type Learner = LearnerPublicData;

// ------------------------------------------------------------------------------------------------

/**
 * Dati di un learner visbili agli amministratori.
 * La password del learner è sempre omessa.
 */

export const learnerAdminDataSchema = z.object({
  id,
  createdAt,
  updatedAt,
  name,
  surname,
  email,
  role,
  pillsId: subscriptionFields.pillsId,
  tracks: z.array(trackPrivateData),
});
export type LearnerAdminData = z.infer<typeof learnerAdminDataSchema>;

// ------------------------------------------------------------------------------------------------

/**
 * Input per API "adminLearner.get"
 */

export const adminLearnerApiGetSchema = z.object({
  id,
});
export type AdminLearnerApiGetInput = z.infer<typeof adminLearnerApiGetSchema>;

// ------------------------------------------------------------------------------------------------

/**
 * Input per API "adminLearner.create"
 */

export const adminLearnerApiCreateSchema = z.object({
  name,
  surname,
  email,
  password,
});
export type AdminLearnerApiCreateInput = z.infer<typeof adminLearnerApiCreateSchema>;

// ------------------------------------------------------------------------------------------------

/**
 * Input per API "adminLearner.update"
 */

export const adminLearnerApiUpdateSchema = z.object({
  id,
  name,
  surname,
  email,
  password: password.optional(),
});
export type AdminLearnerApiUpdateInput = z.infer<typeof adminLearnerApiUpdateSchema>;

// ------------------------------------------------------------------------------------------------

/**
 * Input per API "adminLearner.delete"
 */

export const adminLearnerApiDeleteSchema = z.object({
  id,
});
export type AdminLearnerApiDeleteInput = z.infer<typeof adminLearnerApiDeleteSchema>;

// ------------------------------------------------------------------------------------------------

/**
 * Input form per creazione learner (admin)
 */

export const adminLearnerFormCreateSchema = z.object({
  name,
  surname,
  email,
  password,
});
export type AdminLearnerFormCreateInput = z.infer<typeof adminLearnerFormCreateSchema>;

// ------------------------------------------------------------------------------------------------

/**
 * Input form per modifica learner (admin)
 */

export const adminLearnerFormUpdateSchema = z.object({
  name,
  surname,
  email,
  password: password.optional(),
});
export type AdminLearnerFormUpdateInput = z.infer<typeof adminLearnerFormUpdateSchema>;

// ------------------------------------------------------------------------------------------------
