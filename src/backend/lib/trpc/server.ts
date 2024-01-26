/**
 * src/backend/lib/trpc/server.ts
 *
 * Inizializza il server tRPC
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import { type PrismaClient } from "@prisma/client";
import { initTRPC } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { type NextApiRequest, type NextApiResponse } from "next";
import SuperJSON from "superjson";
import { ZodError } from "zod";
import { db } from "../database";

export type APIContext = {
  db: PrismaClient;
  req: NextApiRequest;
  res: NextApiResponse;
};

// --------------------------------------------------------------------------------------------------------------------

/**
 * Funzione che NextJS richiama lato server per creare il contesto tRPC.
 * @param opts opzioni chiamata HTTP Next
 * @returns contesto con risorse per TRPC
 */

export const createTRPCServerAPIContext = (opts: CreateNextContextOptions): APIContext => {
  // Estrae la richiesta e risposta HTTP.
  const { res, req } = opts;

  // Aggiunge la connessione al DB

  return {
    db,
    req,
    res,
  };
};

// --------------------------------------------------------------------------------------------------------------------

/**
 * Definizione oggetto che gestisce il contesto "APIContext".
 */

export const trpcAPIContextHandler = initTRPC.context<APIContext>().create({
  transformer: SuperJSON,
  errorFormatter: (opts) => {
    const { ctx, error, input, path, shape, type } = opts;

    console.error("ERRORE trpcServer", error, input, path, shape, type);

    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : undefined,
      },
    };
  },
});

// --------------------------------------------------------------------------------------------------------------------

/**
 * Funzione da usare per raggruppare in "route" le varie procedure.
 */

export const createAPIRouter = trpcAPIContextHandler.router;

// --------------------------------------------------------------------------------------------------------------------

/**
 * Funzione da usare per aggiungere dei processi "middleware" prima di chiamare una procedura.
 */

export const createAPIMiddleware = trpcAPIContextHandler.middleware;
