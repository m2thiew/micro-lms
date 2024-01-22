/**
 * src/frontend/lib/trpc/client.ts
 *
 * Inizializza il client tRPC per chiamare gli endpoint delle API.
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import { type APIServerRouter } from "@/backend/lib/router";
import { getAuthorizationHeader } from "@/frontend/features/login/utils/token-storage";
import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";
import SuperJSON from "superjson";

// ------------------------------------------------------------------------------------------------

/**
 * Recupera la url base della applicazione.
 */

const getBaseUrl = (): string => {
  if (typeof window !== "undefined") return ""; // browser should use relative url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

// ------------------------------------------------------------------------------------------------

/**
 * Funzione che crea il contesto TRPC lato frontend.
 */

const createTRPCClientAPIContext = () => {
  const apiClientContext = createTRPCNext<APIServerRouter>({
    config() {
      return {
        // Libreria per trasformare e passare i dati completi
        transformer: SuperJSON,

        // link che il client deve usare per comunicare con le API sul server
        links: [
          // si abilitano i log in fase di sviluppo o nel caso di ricezione di un errore
          loggerLink({
            enabled: (opts) =>
              process.env.NODE_ENV === "development" ||
              (opts.direction === "down" && opts.result instanceof Error),
          }),

          // url del bacekend a cui inviare le richieste API
          httpBatchLink({
            url: `${getBaseUrl()}/api/trpc`,

            // header impostati ad ogni chiamata
            headers() {
              // ad ogni chiamata, se disponibile, legge e aggiunge il token per il login
              // nell'header "Authorization"
              return {
                Authorization: getAuthorizationHeader(),
              };
            },
          }),
        ],
      };
    },

    // se abilitare il Server Side Rendering
    ssr: false,
  });

  return apiClientContext;
};

// ------------------------------------------------------------------------------------------------

/**
 * Oggetto client tRPC per richiamare le api.
 */

export const apiClient = createTRPCClientAPIContext();

// ------------------------------------------------------------------------------------------------

/**
 * Oggetto che gestisce la cache delle chiamate API eseguite dal client tRPC.
 */

// export const apiCache = apiClient.useUtils();

// ------------------------------------------------------------------------------------------------

/**
 * Esportazione type per input delle API definite lato server.
 *
 * @example type HelloInput = APIServerInputs['example']['hello']
 */

export type APIServerInputs = inferRouterInputs<APIServerRouter>;

/**
 * Esportazione type per output delle API definite lato server.
 *
 * @example type HelloOutput = APIServerOutputs['example']['hello']
 */

export type APIServerOutputs = inferRouterOutputs<APIServerRouter>;
