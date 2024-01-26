/**
 * src/shared/features/login/schema.ts
 *
 * Schemi zod per API login e token JWT.
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import { Role } from "@prisma/client";
import { z } from "zod";

// ------------------------------------------------------------------------------------------------

/**
 * Parametri per il login.
 */

export const doLoginSchema = z.object({
  email: z.string().min(3).email().trim(),
  password: z.string().min(3).trim(),
});
export type doLoginSchema = z.infer<typeof doLoginSchema>;

// ------------------------------------------------------------------------------------------------

/**
 * Contenuto di un token.
 */

export const tokenPayloadSchema = z.object({
  name: z.string().min(3).trim(),
  surname: z.string().min(3).trim(),
  email: z.string().min(3).email().trim(),
  role: z.nativeEnum(Role),
});
export type tokenPayloadSchema = z.infer<typeof tokenPayloadSchema>;
