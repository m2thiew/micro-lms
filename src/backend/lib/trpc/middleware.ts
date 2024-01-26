/**
 * src/backend/lib/trpc/middleware.ts
 *
 * Middleware che vengono eseguiti prima di una chiamata API tRPC. Possono eventualmente
 * alterare il contesto della chiamata.
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import { schemaTokenPayload } from "@/shared/features/login/schema";
import { verifyToken } from "@/shared/features/login/utils/jwt";
import { type $Enums } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { createAPIMiddleware, type APIContext } from "./server";

// Type per contesto con dati di login

export type APIContextLoggedIn = APIContext & {
  token: string;
  email: string;
  role: $Enums.Role;
};

export type APIContextAdmin = APIContextLoggedIn & {
  role: $Enums.Role & "ADMIN";
};

export const isAPIContextLoggedIn = (object: unknown): object is APIContextLoggedIn => {
  if (typeof object === "object" && object) {
    return "db" in object && "token" in object && "email" in object && "role" in object;
  }
  return false;
};

export const isAPIContextAdmin = (object: unknown): object is APIContextAdmin => {
  if (isAPIContextLoggedIn(object)) {
    return object.role == "ADMIN";
  }
  return false;
};

// ------------------------------------------------------------------------------------------------

/**
 * Middleware che blocca la chiamata se l'utente non è loggato (non viene passato un JWT token valido)
 */

export const requireLearnerLoggedIn = createAPIMiddleware(async ({ ctx, next }) => {
  //
  // risorse del server.
  const { db } = ctx;

  // Verifica la presenza delle chiavi per cifrare/decifrare i token
  const jwtPrivateKey = process.env.JWT_PRIVATE_KEY;
  const jwtPublicKey = process.env.JWT_PUBLIC_KEY;

  if (!jwtPrivateKey || !jwtPublicKey) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

  // estra l'header autentication dalla richiesta.
  const { req } = ctx;
  const { headers } = req;

  const authorization = headers.authorization;

  if (!authorization) throw new TRPCError({ code: "UNAUTHORIZED" });

  // estrae il contenuto della richiesta.
  const [beacon, token] = authorization.split(" ");

  if (!beacon || !token || beacon != "Bearer") throw new TRPCError({ code: "UNAUTHORIZED" });

  // verifica se il token JWT è valido.
  const verification = await verifyToken(jwtPublicKey, token);

  if (!verification) throw new TRPCError({ code: "UNAUTHORIZED" });

  // il token è valido. Estra l'username (email) e il ruolo dell'utente.
  const payload = schemaTokenPayload.parse(verification.payload);
  const { email, role } = payload;

  // esegue una query per verificare se esiste l'utente con la sessione corrispondente
  // al token appena analizzato.

  const session = await db.session.findFirst({
    select: { id: true },
    where: {
      token: token,
      Learner: { email: email, role: role },
    },
  });

  if (!session) throw new TRPCError({ code: "UNAUTHORIZED" });

  // aggiunge l'email e il ruolo al contesto della chiamata api.
  const newCtx: APIContextLoggedIn = { ...ctx, token, email, role };

  // procede ad eseguire la chiamata
  return next({ ctx: newCtx });
});

// ------------------------------------------------------------------------------------------------

/**
 * Middleware che blocca la chiamata se l'utente non è loggato con il ruolo "ADMIN"
 */

export const requireAdminLoggedIn = createAPIMiddleware(({ ctx, next }) => {
  if (!isAPIContextAdmin(ctx)) throw new TRPCError({ code: "UNAUTHORIZED" });

  // il contesto della chiamata viene mutato in "APIContextAdmin"

  // procede ad eseguire la chiamata
  return next({ ctx });
});
