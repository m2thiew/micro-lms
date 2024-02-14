/**
 * src/shared/lib/mime.ts
 *
 * Esporta l'oggetto MIME utile per analizzare il contenuto dei file.
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */
import { Mime } from "mime";
import standardTypes from "mime/types/standard.js";

// ------------------------------------------------------------------------------------------------

/**
 * Oggetto per analizzare i mime types dei file.
 */
export const mime = new Mime(standardTypes);
