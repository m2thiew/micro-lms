/**
 * src/frontend/utils/session.ts
 *
 * funzioni utili a gestire gli ID di sessione.
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import { DateTime } from "luxon";

// ------------------------------------------------------------------------------------------------

/**
 * chiave per salvare l'ID di sessione per gli upload.
 */
export const UPLOAD_SESSION_KEY = "uploadSession" as const;

// ------------------------------------------------------------------------------------------------

/**
 * Recupera o genera un ID da usare come "sessione" per le operazioni di upload
 * @returns ID sessione di upload
 */
export const getUploadSession = (): string => {
  try {
    const session = window.sessionStorage.getItem(UPLOAD_SESSION_KEY);

    if (session) {
      return session;
    } else {
      // genera e salva al momento il nuovo ID sessione.
      const newSession = DateTime.now().toFormat("HHmmss");

      window.sessionStorage.setItem(UPLOAD_SESSION_KEY, newSession);

      return newSession;
    }
  } catch (error) {
    // non è supportato il sessionStorage.
    return "000000";
  }
};

// ------------------------------------------------------------------------------------------------
