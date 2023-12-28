/**
 * Definisce dei blocchi di partenza per definire le procedure (ogni blocco di partenza è
 * configurato per usare uno o più middleware)
 */

import { trpcAPIContextHandler } from "..";

// --------------------------------------------------------------------------------------------------------------------

/**
 * Blocco di partenza per creare procedure pubbliche (senza alcun middleware)
 */

export const publicAPIProcedure = trpcAPIContextHandler.procedure;
