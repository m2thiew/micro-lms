/**
 * src/backend/lib/database.ts
 *
 * Connessione al database princiale della applicazione
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import { PrismaClient } from "@prisma/client";

// setup necessario per funzionare con nextJs in modalità "dev".
// https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices

const getPrismaClient = (): PrismaClient => {
  return new PrismaClient({
    log: ["query", "info", "warn", "error"],
  });
};

declare global {
  // eslint-disable-next-line no-var
  var dbInstance: PrismaClient | undefined;
}

export const db: PrismaClient = globalThis.dbInstance ?? getPrismaClient();

const isDev = process.env.NODE_ENV == ("development" as const);
globalThis.dbInstance = isDev ? db : undefined;
