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

export const schemaDoLogin = z.object({
  email: z.string().min(3).email().trim(),
  password: z.string().min(3).trim(),
});
export type schemaDoLogin = z.infer<typeof schemaDoLogin>;

// ------------------------------------------------------------------------------------------------

/**
 * Contenuto di un token.
 */

export const schemaTokenPayload = z.object({
  email: z.string().min(3).email().trim(),
  role: z.nativeEnum(Role),
});
export type schemaTokenPayload = z.infer<typeof schemaTokenPayload>;
