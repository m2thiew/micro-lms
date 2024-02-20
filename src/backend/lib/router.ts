/**
 * src/backend/lib/router.ts
 *
 * Raccoglie tutte le possibili "route" (percorsi) che contengono al loro interno le
 * chiamate endpoint per le API.
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import { createAPIRouter } from "@/backend/lib/trpc/server";
import { helloApi } from "../features/hello/api";
import { adminLearnerApi } from "../features/learner/api/admin";
import { loginApi } from "../features/login/api";
import { adminPillApi } from "../features/pill/api/admin";

export const apiServerRouter = createAPIRouter({
  hello: helloApi,
  login: loginApi,
  adminLearner: adminLearnerApi,
  adminPill: adminPillApi,
});

// --------------------------------------------------------------------------------------------------------------------

/**
 * Lato frontend, non viene importato l'intero oggetto "router" ma solo la definizione
 * delle chiamate disponibili.
 */

export type APIServerRouter = typeof apiServerRouter;
