/**
 * src/backend/lib/trpc/procedures.ts
 *
 * Definisce dei blocchi di partenza per definire le procedure di tRPC (ogni blocco di partenza è
 * configurato per usare uno o più middleware)
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import { requireAdminLoggedIn, requireLearnerLoggedIn } from "./middleware";
import { trpcAPIContextHandler } from "./server";

console.log("trcp procedured");
debugger; //,,,,

// import { requireAdminLoggedIn, requireLearnerLoggedIn } from "@/backend/features/login";

// ------------------------------------------------------------------------------------------------

/**
 * Blocco di partenza per creare procedure pubbliche (senza alcun middleware)
 */

export const publicAPIProcedure = trpcAPIContextHandler.procedure;

console.debug("PROCEDURES", publicAPIProcedure); //,,,

// ------------------------------------------------------------------------------------------------

/**
 * Blocco di partenza per creare procedure per utenti loggati (non importa il ruolo)
 */

export const loggedInAPIProcedure = publicAPIProcedure.use(requireLearnerLoggedIn);

// ------------------------------------------------------------------------------------------------

/**
 * Blocco di partenza per creare procedure per utenti loggati e con il ruolo "ADMIN"
 */

export const adminAPIProcedure = loggedInAPIProcedure.use(requireAdminLoggedIn);
