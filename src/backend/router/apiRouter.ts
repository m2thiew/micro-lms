/**
 * Raccoglie tutte le possibili "route" (percorsi) che contengono al loro interno le
 * chiamate endpoit per le API.
 */

import { createAPIRouter } from "..";
import { apiHello } from "../features/hello";

export const apiRouter = createAPIRouter({
  hello: apiHello,
});

// --------------------------------------------------------------------------------------------------------------------

/**
 * Lato frontend, non viene importato l'intero oggetto "router" ma solo la definizione
 * delle chiamate disponibili.
 */

export type APIRouter = typeof apiRouter;
