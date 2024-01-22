/**
 * src/backend/lib/database.ts
 *
 * Connessione al database princiale della applicazione
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

console.log("database");
debugger; //,,,,

import { PrismaClient } from "@prisma/client";

export const db = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});
