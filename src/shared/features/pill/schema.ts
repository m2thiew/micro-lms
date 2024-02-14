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

// ------------------------------------------------------------------------------------------------

/**
 * Configurazione upload thumb pillole.
 */

export const uploadPillThumbConf: UploadConfig = {
  id: "pillThumb",
  accept: ["image/*"],
  uploadDir: "thumbs/",
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
