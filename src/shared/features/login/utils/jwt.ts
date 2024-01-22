/**
 * src/shared/features/login/utils/jwt.ts
 *
 * Funzioni per la generazione & validazione dei token JWT
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import { default as crypto } from "crypto";
import { default as jose, type JWTHeaderParameters, type JWTPayload } from "jose";
import { schemaTokenPayload } from "../schema";

// type guard per JWTPayload

export const isJWTPayload = (object: unknown): object is JWTPayload => {
  if (typeof object === "object" && object) {
    return (
      (object as Partial<JWTPayload>).exp !== undefined &&
      (object as Partial<JWTPayload>).iat !== undefined
    );
  }
  return false;
};

export const isJWTHeaderParameters = (object: unknown): object is JWTHeaderParameters => {
  if (typeof object === "object" && object) {
    return (object as Partial<JWTHeaderParameters>).alg !== undefined;
  }
  return false;
};

// type per token verificato.

export type JWTDecoded = {
  payload: JWTPayload;
  protectedHeader: JWTHeaderParameters;
};

// type per dati di login leggibili dal token JWT.

export type LoginData = schemaTokenPayload & {
  expire: Date;
};

// Costanti per generare i token.

export const TOKEN_MAX_AGE = 120 as const;
export const REFRESH_TOKEN_MAX_AGE = 300 as const;
export const TOKEN_ALGORITHM = "RS256" as const;

// ------------------------------------------------------------------------------------------------

/**
 * Funzione che genera il token + refreh token.
 *
 * @param jwtPrivateKey chiave privata
 * @param payload contenuto da inserire
 * @returns token JWT e refresh token
 */

export const generateTokens = async (jwtPrivateKey: string, payload: Record<string, unknown>) => {
  // generazione token JWT.

  const privateKey = await jose.importPKCS8(jwtPrivateKey, TOKEN_ALGORITHM);
  const token = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: TOKEN_ALGORITHM })
    .setIssuedAt()
    .setExpirationTime(`${TOKEN_MAX_AGE} seconds`)
    .sign(privateKey);

  // generazione refresh token.

  const refreshToken = await new Promise<string>((resolve) => {
    crypto.generateKey("hmac", { length: 64 }, (err, key) => {
      resolve(key.export().toString("hex"));
    });
  });

  return { token, refreshToken };
};

// ------------------------------------------------------------------------------------------------

/**
 * Funzione che verifica in modo completo il token (fimra e data di scadenza) e ne restituisce il contenuto.
 *
 * @param jwtPublicKey chiave pubblica
 * @param token token da verificare
 * @returns payload e gli header del JWT
 */

export const verifyToken = async (
  jwtPublicKey: string,
  token: string,
): Promise<JWTDecoded | undefined> => {
  const publicKey = await jose.importSPKI(jwtPublicKey, TOKEN_ALGORITHM);

  try {
    const { payload, protectedHeader } = await jose.jwtVerify(token, publicKey, {
      algorithms: [TOKEN_ALGORITHM],
    });

    return { payload, protectedHeader };
  } catch (error) {
    return undefined;
  }
};

// ------------------------------------------------------------------------------------------------

/**
 * Funzione che verifica solo la firma del token e ne restituisce il contenuto.
 *
 * @param jwtPublicKey chiave pubblica
 * @param token token da verificare
 * @returns payload e gli header del JWT
 */

export const verifyTokenSign = async (
  jwtPublicKey: string,
  token: string,
): Promise<JWTDecoded | undefined> => {
  const publicKey = await jose.importSPKI(jwtPublicKey, TOKEN_ALGORITHM);

  try {
    // "compact" indica un generico JWS (contenuto firmato). È necessario uno step intermedio
    // per ottenere l'oggetto JSON

    const { payload: uint8Payload, protectedHeader } = await jose.compactVerify(token, publicKey, {
      algorithms: [TOKEN_ALGORITHM],
    });

    const stringPayload = new TextDecoder().decode(uint8Payload);
    const payload: unknown = JSON.parse(stringPayload);

    if (isJWTPayload(payload) && isJWTHeaderParameters(protectedHeader)) {
      return { payload, protectedHeader };
    }

    return undefined;
  } catch (error) {
    return undefined;
  }
};

// ------------------------------------------------------------------------------------------------

/**
 * Estrae il contenuto del token senza verificarne la validità
 *
 * @param token toekn JWT
 * @returns il contenuto del token
 */

export const decodeToken = (token: string) => {
  return jose.decodeJwt(token);
};

// ------------------------------------------------------------------------------------------------

/**
 * Dato un payload estratto del token, estrae i dati essenziali per il login.
 *
 * @param payload payload JWT ottenuto decodificando il token
 * @returns le informazioni di login | undefined
 */

export const getLoginDataFromToken = (payload: JWTPayload): LoginData | undefined => {
  //
  try {
    // Trasforma il payload generico nel payload specifico per il login.
    const loginData = schemaTokenPayload.parse(payload);

    // estrae la data di scadenza del token.
    const timestampExpire = payload.exp;

    const expire = timestampExpire ? new Date(timestampExpire) : new Date(Date.now());

    // restituisce i dati.
    return {
      ...loginData,
      expire,
    };
  } catch (error) {
    // payload non valido
    console.error(error);
    return undefined;
  }
};

// ------------------------------------------------------------------------------------------------
