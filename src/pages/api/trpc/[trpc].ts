/**
 * Definisce che NextJS deve utilizzare tRPC per gestire tutte le chiamate dirette
 * a "[sito]/api/trpc/"
 */

console.log("api [trcp]");
debugger; //,,,,

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
