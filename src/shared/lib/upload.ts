/**
 * src/shared/lib/upload.ts
 *
 * configurazioni per upload dei file.
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import { z } from "zod";
import { uploadPillContentConfig, uploadPillThumbConfig } from "../features/pill/schema";

// ------------------------------------------------------------------------------------------------

/**
 * Type per oggetti che rappresentano la configurazione di upload.
 */
export type UploadConfig = {
  id: string;
  accept: string[];
  multiple?: true;
  capture?: "user" | "environment";
  uploadDir: string;
};

// ------------------------------------------------------------------------------------------------

/**
 * Schema per informazioni di un file caricato.
 */
export const uploadedFileSchema = z.object({
  filename: z.string().min(3).trim(),
  path: z.string().min(3).trim(),
  mimetype: z.string().min(3).optional(),
  size: z.number().int(),
});

export type UploadedFile = z.infer<typeof uploadedFileSchema>;

// schema per array di file caricati.
export const uploadedFilesSchema = uploadedFileSchema.array();

// ------------------------------------------------------------------------------------------------

/**
 * Raccolta indicizzata di tutte le configurazioni di upload.
 */
export const uploadConfigs: Record<string, UploadConfig> = {
  [uploadPillThumbConfig.id]: uploadPillThumbConfig,
  [uploadPillContentConfig.id]: uploadPillContentConfig,
} as const;
