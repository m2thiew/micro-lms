/**
 * src/pages/api/trpc/[trpc].ts
 *
 * Definisce che NextJS deve utilizzare tRPC per gestire tutte le chiamate dirette
 * a "[sito]/api/trpc/"
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import { apiServerRouter } from "@/backend/lib/router";
import { createTRPCServerAPIContext } from "@/backend/lib/trpc/server";
import { createNextApiHandler } from "@trpc/server/adapters/next";

export default createNextApiHandler({
  router: apiServerRouter,
  createContext: createTRPCServerAPIContext,
  onError: (opts) => {
    const { ctx, error, input, path, req, type } = opts;
    console.error("ERROR NextJS - rilevato errore", error.message);
  },
});
