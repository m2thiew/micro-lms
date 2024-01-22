/**
 * Funzioni per leggere / salvare il token in local storage.
 */

// nome assegnato al token in localStorage.

const tokenKey = "token" as const;

// ------------------------------------------------------------------------------------------------

/**
 * Salva il token in localStorage
 *
 * @param token token da salvare
 * @returns il token salvato
 */

export const setTokenInStorage = (token: string): string | undefined => {
  try {
    localStorage.setItem(tokenKey, token);
    return token;
  } catch (error) {
    return undefined;
  }
};

// ------------------------------------------------------------------------------------------------

/**
 * Legge il token salvato da localStorage.
 *
 * @returns il token salvato | undefined se non presente
 */

export const getTokenFromStorage = (): string | undefined => {
  try {
    const token = localStorage.getItem(tokenKey);

    return token ? token : undefined;
  } catch (error) {
    return undefined;
  }
};

// ------------------------------------------------------------------------------------------------

/**
 * Elimina il token da localStorage
 */

export const deleteTokenFromStorage = (): void => {
  localStorage.removeItem(tokenKey);
};

// ------------------------------------------------------------------------------------------------

/**
 * Costruisce l'header "Authorization" se è presente il token salvato
 */

export const getAuthorizationHeader = (): string | undefined => {
  const token = getTokenFromStorage();

  if (token) {
    return `Bearer ${token}`;
  }

  return undefined;
};
