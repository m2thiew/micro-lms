/**
 * Definisce che NextJS deve utilizzare tRPC per gestire tutte le chiamate dirette
 * a "[sito]/api/trpc/"
 */

import { apiRouter, createTRPCAPIContext } from "@/backend";
import { createNextApiHandler } from "@trpc/server/adapters/next";

export default createNextApiHandler({
  router: apiRouter,
  createContext: createTRPCAPIContext,
  onError: (opts) => {
    const { ctx, error, input, path, req, type } = opts;
    console.error("ERROR NextJS - rilevato errore", error.message);
  },
});
