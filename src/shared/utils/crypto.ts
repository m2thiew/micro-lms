/**
 * src/shared/utils/crypto.ts
 *
 * funzioni per calcolo di hash / criptazione / decriptazione.
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import { createHash } from "crypto";

// ------------------------------------------------------------------------------------------------

/**
 * calcola il md5 del testo passato
 * @param text stringa originale
 * @returns md5 della stringa
 */
export const getMd5 = (text: string): string => {
  return createHash("md5").update(text).digest("hex");
};
