/**
 * src/shared/features/subscription/schema.ts
 *
 * definizione tipi e campi per le assegnazioni pillole
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import { number, z } from "zod";

// ------------------------------------------------------------------------------------------------

/**
 * Definizione campi con vincoli
 */

export const subscriptionFields = {
  learnerId: z.number().int(),
  pillsId: z.array(z.number().int()),
} as const;

const { learnerId, pillsId } = subscriptionFields;

// ------------------------------------------------------------------------------------------------

/**
 * Pipeline per trasformare gli array in oggetti per pre-selezionare le checkbox in react-hook-form.
 */

// trasforma l'array con gli id delle pillole assegnate in un oggetto avente come chiavi tali id.
// tale oggetto viene usato per pre-selezionare nei fomr i checkbox con fli i delle pillole.

const pillsIdCheckboxes = z.record(z.string(), z.coerce.boolean());
type PillsIdCheckboxes = z.infer<typeof pillsIdCheckboxes>;

const pillsIdToCheckboxes = pillsId
  .transform((pillsId): PillsIdCheckboxes => {
    const checked: PillsIdCheckboxes = {};
    pillsId.forEach((pillId) => {
      checked[pillId] = true;
    });

    return checked;
  })
  .pipe(pillsIdCheckboxes);

const checkboxesToPillsId = pillsIdCheckboxes
  .transform((checkboxes): number[] => {
    const checkboxNames: string[] = Object.keys(checkboxes);
    const pillsId: number[] = [];

    checkboxNames.forEach((checkName) => {
      const pillId = Number(checkName);

      if (!isNaN(pillId) && pillId > 0 && checkboxes[checkName]) {
        pillsId.push(pillId);
      }
    });

    return pillsId;
  })
  .pipe(pillsId);

// ------------------------------------------------------------------------------------------------

/**
 * Dati assegnazione (admin)
 */
export const subscriptionAdminDataSchema = z.object({
  learnerId,
  pillsId,
});
export type SubscriptionAdminData = z.infer<typeof subscriptionAdminDataSchema>;

/**
 * Dati assegnazione (public)
 */
export const subscriptionSchema = subscriptionAdminDataSchema;
export type Subscription = SubscriptionAdminData;

// ------------------------------------------------------------------------------------------------

/**
 * Input API "adminSubscription.get"
 */
export const adminSubscriptionApiGetSchema = z.object({
  learnerId,
});
export type AdminSubscriptionApiGetInput = z.infer<typeof adminSubscriptionApiGetSchema>;

// ------------------------------------------------------------------------------------------------

/**
 * Input API "adminSubscription.set"
 */
export const adminSubscriptionApiSetSchema = z.object({
  learnerId,
  pillsId,
});
export type AdminSubscriptionApiSetInput = z.infer<typeof adminSubscriptionApiSetSchema>;

// ------------------------------------------------------------------------------------------------

/**
 * Input per form settagio assegnazione.
 */
export const adminSubscriptionFormSetSchema = z.object({
  learnerId,
  pillsId: pillsIdCheckboxes.or(pillsIdToCheckboxes),
});
export type AdminSubscriptionFormSetInput = z.infer<typeof adminSubscriptionFormSetSchema>;

/**
 * Conversione da input del form a input per API.
 */
export const adminSubscriptionFormSetOutputSchema = z.object({
  learnerId,
  pillsId: checkboxesToPillsId,
});
export type AdminSubscriptionFormSetOutput = z.infer<typeof adminSubscriptionFormSetOutputSchema>;

// ------------------------------------------------------------------------------------------------
