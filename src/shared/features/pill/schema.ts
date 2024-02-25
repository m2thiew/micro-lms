/**
 * src/shared/features/pill/schema.ts
 *
 * Schema/type per le pillole
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import { type UploadConfig } from "@/shared/lib/upload";
import { z } from "zod";

// ------------------------------------------------------------------------------------------------

/**
 * Definizione campi con relativi vincoli.
 */

export const pillContentFields = {
  path: z.string().trim(),
} as const;

const { path } = pillContentFields;

export const pillFields = {
  id: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  title: z.string().trim().min(3),
  description: z.string().trim().min(10).or(z.string().length(0)),
  thumbPath: z.string().trim().nullish(),
  content: z.array(z.string().trim()).nonempty(),
} as const;

const { id, createdAt, updatedAt, title, description, thumbPath, content } = pillFields;

// Definizione campi per upload dei file.

const thumbPathUpload = z
  .string()
  .trim()
  .nullish()
  .or(
    z
      .array(z.string().trim())
      .length(1)
      .transform((value): string => value.at(0) ?? "")
      .nullish(),
  );

const contentUpload = z.array(z.string().trim()).nonempty();

// trasformazione dati da fomrato DB a formato app.

const contentRow = z.object({
  path: z.string(),
});
type ContentRow = z.infer<typeof contentRow>;

export const contentRowToContent = contentRow.transform((contentRow): string => contentRow.path);

// ------------------------------------------------------------------------------------------------

/**
 * Dati di una pillola visbili agli amministratori.
 */

export const pillAdminDataSchema = z.object({
  id,
  createdAt,
  updatedAt,
  title,
  description,
  thumbPath,
  content,
});
export type PillAdminData = z.infer<typeof pillAdminDataSchema>;

// ------------------------------------------------------------------------------------------------

/**
 * Dati di una pillola visbili a tutti.
 */

export const pillPublicDataSchema = z.object({
  id,
  title,
  description,
  thumbPath,
  content,
});
export type PillPublicData = z.infer<typeof pillPublicDataSchema>;

// ------------------------------------------------------------------------------------------------

/**
 * Input per API "adminPill.get"
 */

export const adminPillApiGetSchema = z.object({
  id,
});
export type AdminPillApiGetInput = z.infer<typeof adminPillApiGetSchema>;

// ------------------------------------------------------------------------------------------------

/**
 * Input per API "adminLearner.create"
 */

export const adminPillApiCreateSchema = z.object({
  title,
  description,
  thumbPath,
  content,
});
export type AdminPillApiCreateInput = z.infer<typeof adminPillApiCreateSchema>;

// ------------------------------------------------------------------------------------------------

/**
 * Input per API "adminLearner.update"
 */

export const adminPillApiUpdateSchema = z.object({
  id,
  title,
  description,
  thumbPath,
  content,
});
export type AdminPillApiUpdateInput = z.infer<typeof adminPillApiUpdateSchema>;

// ------------------------------------------------------------------------------------------------

/**
 * Input per API "adminPill.delete"
 */

export const adminPillApiDeleteSchema = z.object({
  id,
});
export type AdminPillApiDeleteInput = z.infer<typeof adminPillApiDeleteSchema>;

// ------------------------------------------------------------------------------------------------

/**
 * Input per API "learnerPill.get"
 */

export const privatePillApiGetSchema = z.object({
  id,
});
export type PrivatePillApiGetInput = z.infer<typeof privatePillApiGetSchema>;

// ------------------------------------------------------------------------------------------------

/**
 * Input per API "learnerPill.get"
 */

export const privatePillApiSetTrackSchema = z.object({
  id,
});
export type PrivatePillApiSetTrackInput = z.infer<typeof privatePillApiSetTrackSchema>;

// ------------------------------------------------------------------------------------------------

/**
 * Input per form creazione pillola.
 */

export const adminPillFormCreateSchema = z.object({
  title,
  description: description.or(z.string().length(0)),
  thumbPath: thumbPathUpload,
  content: contentUpload,
});
export type AdminPillFormCreateInput = z.infer<typeof adminPillFormCreateSchema>;

// ------------------------------------------------------------------------------------------------

/**
 * Input per API "adminLearner.update"
 */

export const adminPillFormUpdateSchema = z.object({
  title,
  description: description.or(z.string().length(0)),
  thumbPath: thumbPathUpload,
  content: contentUpload,
});
export type AdminPillFormUpdateInput = z.infer<typeof adminPillFormUpdateSchema>;

// ------------------------------------------------------------------------------------------------

/**
 * Configurazione upload thumb pillole.
 */

export const uploadPillThumbConfig: UploadConfig = {
  id: "pillThumb",
  accept: ["image/*"],
  uploadDir: "thumb/",
} as const;

// ------------------------------------------------------------------------------------------------

/**
 * Configurazione upload contenuti pillole.
 */

export const uploadPillContentConfig: UploadConfig = {
  id: "pillContent",
  accept: ["image/*", "video/*"],
  multiple: true,
  uploadDir: "content/",
} as const;

// ------------------------------------------------------------------------------------------------
