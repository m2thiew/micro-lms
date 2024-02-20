/**
 * src/shared/utils/error.ts
 *
 * funzioni utili a maneggiare gli errori
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import { type FieldError, type Merge } from "react-hook-form";

// ------------------------------------------------------------------------------------------------

export const isFieldError = (obj: unknown): obj is FieldError => {
  if (obj && typeof obj === "object") {
    return "type" in obj;
  }
  return false;
};

// ------------------------------------------------------------------------------------------------

export const getFormErrorMessage = (
  formError: Merge<FieldError, (FieldError | undefined)[]> | undefined,
): string | undefined => {
  if (formError) {
    if (formError instanceof Array) {
      const errors = formError.filter((e): e is FieldError => isFieldError(e));

      const messages = errors
        .map((e) => e.message)
        .filter((m): m is string => typeof m === "string");

      return messages.join(", ");
    } else if (isFieldError(formError)) {
      return formError.message;
    }

    return undefined;
  }
};

// ------------------------------------------------------------------------------------------------
