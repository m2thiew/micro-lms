/**
 * Semplice API che saltuta l'utente.
 */

import { createAPIRouter, publicAPIProcedure } from "@/backend";
import { z } from "zod";

// --------------------------------------------------------------------------------------------------------------------

type HelloReturn = {
  message: string;
};

// --------------------------------------------------------------------------------------------------------------------

/**
 * Saluta l'utente
 */

const hello = publicAPIProcedure.input(z.object({ name: z.string().min(1) })).query(({ input }): HelloReturn => {
  return { message: `Hello ${input.name}` };
});

// --------------------------------------------------------------------------------------------------------------------

export const apiHello = createAPIRouter({
  hello,
});
