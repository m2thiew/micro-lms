/**
 * src/backend/features/hello/api.ts
 *
 * Semplice API che saltuta l'utente.
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

console.log("api-hello");
debugger; //,,,,

import { z } from "zod";

import { publicAPIProcedure } from "@/backend/lib/trpc/procedures";
import { createAPIRouter } from "@/backend/lib/trpc/server";

// --------------------------------------------------------------------------------------------------------------------

type HelloReturn = {
  message: string;
};

// --------------------------------------------------------------------------------------------------------------------

/**
 * Saluta l'utente
 */

const hello = publicAPIProcedure
  .input(z.object({ name: z.string().min(1) }))
  .query(({ input }): HelloReturn => {
    return { message: `Hello ${input.name}` };
  });

// --------------------------------------------------------------------------------------------------------------------

export const helloApi = createAPIRouter({
  hello,
});
