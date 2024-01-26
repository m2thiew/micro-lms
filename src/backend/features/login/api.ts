/**
 * src/backend/features/login/api.ts
 *
 * Gestisce le procedure di login lato backend.
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import {
  adminAPIProcedure,
  loggedInAPIProcedure,
  publicAPIProcedure,
} from "@/backend/lib/trpc/procedures";
import { createAPIRouter } from "@/backend/lib/trpc/server";
import { doLoginSchema, tokenPayloadSchema } from "@/shared/features/login/schema";
import { generateTokens } from "@/shared/features/login/utils/jwt";
import { TRPCError } from "@trpc/server";
import { default as crypto } from "crypto";

// Risposte delle API-

type doLoginReturn = {
  token: string;
};
type doLogoutReturn = {
  token: string;
};

type testReturn = "success" | "fail";

// ------------------------------------------------------------------------------------------------

/**
 * Chiamata di login con username e password. Se validi, genera un JWT token + refresh token.
 */

const doLogin = publicAPIProcedure
  .input(doLoginSchema)
  .mutation(async ({ ctx, input }): Promise<doLoginReturn> => {
    // Verifica la presenza delle chiavi per cifrare/decifrare i token
    const jwtPrivateKey = process.env.JWT_PRIVATE_KEY;
    const jwtPublicKey = process.env.JWT_PUBLIC_KEY;

    if (!jwtPrivateKey || !jwtPublicKey) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

    // Estrazione risorse.

    const { db } = ctx;

    // verifica se il login è valido.

    const hashedPasswod = crypto.createHash("md5").update(input.password).digest("hex");

    const learner = await db.learner.findFirst({
      select: {
        id: true,
        name: true,
        surname: true,
        email: true,
        role: true,
      },
      where: {
        email: input.email,
        password: hashedPasswod,
      },
    });

    if (!learner) throw new TRPCError({ code: "UNAUTHORIZED", message: "Credenziali non valide" });

    // Utente trovato. Genero il JWT e il refresh token.

    const payload = tokenPayloadSchema.parse({
      name: learner.name,
      surname: learner.surname,
      email: learner.email,
      role: learner.role,
    });

    const { token, refreshToken } = await generateTokens(jwtPrivateKey, payload);

    // Salvo in datbase la nuova sessione.

    const _session = await db.session.upsert({
      create: {
        token: token,
        refreshToken: refreshToken,
        learnerId: learner.id,
      },
      update: {
        token: token,
        refreshToken: refreshToken,
      },
      where: {
        learnerId: learner.id,
      },
    });

    // Restituisco il token.

    // res.setHeader(
    //   "Set-Cookie",
    //   `token=${token}; Max-Age=${tokenMaxAge}; Path=/; SameSite=Strict; Secure; `,
    // );
    // res.setHeader(
    //   "Set-Cookie",
    //   `refreshToken=${refreshToken}; Max-Age=${refreshTokenMaxAge}; Path=/; SameSite=Strict; Secure; HttpOnly; `,
    // );

    return { token };
  });

// ------------------------------------------------------------------------------------------------

/**
 * Chiamata di test per verificare il login (qualsiasi ruolo)
 */

const testLoggedIn = loggedInAPIProcedure.query((): testReturn => {
  return "success";
});

// ------------------------------------------------------------------------------------------------

/**
 * Chiamata di test per verificare il login come ADMInìN
 */

const testAdmin = adminAPIProcedure.query((request): testReturn => {
  return "success";
});

// ------------------------------------------------------------------------------------------------

/**
 * Chiamata per eseguire il logout di un utente già loggato.
 */

const doLogout = loggedInAPIProcedure.mutation(async ({ ctx }): Promise<doLogoutReturn> => {
  //
  // cancella da database la riga di sessione legata al token e all'utente ad esso collegato.

  const { db, token, email, role } = ctx;

  const _deltedSession = await db.session.deleteMany({
    where: {
      token: token,
      Learner: { email: email, role: role },
    },
  });

  // restituisce in risposta il token JWT ora rimosso da DB.
  return { token };
});

// ------------------------------------------------------------------------------------------------

export const loginApi = createAPIRouter({ doLogin, testLoggedIn, testAdmin, doLogout });
