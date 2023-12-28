/**
 * Setup della connessione al database della applicazione.
 */

import { PrismaClient } from "@prisma/client";

export const db = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});
