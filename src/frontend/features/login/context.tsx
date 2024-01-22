/**
 * Contesto react che fornisce lo stato di login a tutti gli altri componenti.
 */

import { apiClient } from "@/frontend/lib/trpc/client";
import {
  getLoginDataFromToken,
  verifyToken,
  type JWTDecoded,
  type LoginData,
} from "@/shared/features/login/utils/jwt";
import React, { useContext, useEffect, useState } from "react";
import {
  deleteTokenFromStorage,
  getTokenFromStorage,
  setTokenInStorage,
} from "./utils/token-storage";

// Variabile di ambiente Frontend.

const jwtPublicKey = process.env.JWT_PUBLIC_KEY;

// Stato esposto dal il contesto.
type LoginState =
  | {
      token?: undefined;
      data?: undefined;
      isLoading: boolean;
      error: string | undefined;
    }
  | {
      token: string;
      data: LoginData;
      isLoading: boolean;
      error: string | undefined;
    };

// Funzioni esposte dal contesto.
type LoginFunctions = {
  doLogin: (username: string, password: string) => Promise<void>;
  doLogout: () => Promise<void>;
};

// dati & funzioni esposti dal contesto
type LoginContext = LoginState & LoginFunctions;

// Proprietà passate al contesto.
type LoginProviderProps = {
  children: React.ReactNode;
};

// valore di default del contesto.
const defaultValue: LoginContext = {
  token: undefined,
  isLoading: true,
  error: undefined,
  doLogin: async () => {
    /* nessuna azione */
  },
  doLogout: async () => {
    /* nessuna azione */
  },
};

// ------------------------------------------------------------------------------------------------

/**
 * Contesto per gestire lo stato di login dell'utente.
 */

export const LoginContext = React.createContext<LoginContext>(defaultValue);

// ------------------------------------------------------------------------------------------------

/**
 * Implementazione del contesto.
 */

export const LoginProvider = (props: LoginProviderProps): React.JSX.Element => {
  // Senza la chiave pubblica, il login non può funzionare.
  if (!jwtPublicKey) {
    throw new Error("missing pubkey");
  }

  // chiamate API utilizzate.
  const doLoginCall = apiClient.login.doLogin.useMutation();
  const doLogoutCall = apiClient.login.doLogout.useMutation();
  const apiCache = apiClient.useUtils();

  // token JWT che rappresenta il login.
  const [token, setToken] = useState<string | undefined>(undefined);
  const [decodedToken, setDecodedtoken] = useState<JWTDecoded | undefined>(undefined);

  // stato di caricamento.
  const [isLoading, setLoading] = useState<boolean>(true);

  // eventuale errore nelle funzioni.
  const [error, setError] = useState<string | undefined>(undefined);

  // la decodifica del token viene ricalcolata ogni volta che cambia il token.
  // essendo l'operazione "verifyToken" asincrona, devo eseguire la operazione
  // dentro un "useEffect".
  useEffect(() => {
    if (token) {
      verifyToken(jwtPublicKey, token)
        .then((value) => {
          setDecodedtoken(value);
        })
        .catch(() => {
          setDecodedtoken(undefined);
        });
    } else {
      setDecodedtoken(undefined);
    }
  }, [token]);

  // dal token decodificato, ricava le informazioni dell'utente.
  const data = decodedToken ? getLoginDataFromToken(decodedToken.payload) : undefined;

  // Inizializzazione contesto:
  // recupera il token dal local storage.
  useEffect(() => {
    const storedToken = getTokenFromStorage();
    if (storedToken) {
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  // ----------------------------------------------------------------------------------------------

  /**
   * Funzione che esegue il login.
   */

  const doLogin = async (username: string, password: string): Promise<void> => {
    // se è già stato eseguito il login, non esegue alcuna azione
    if (isLoading || data) return;

    setLoading(true);

    // Chiamata alle API per eseguire il login.

    const input = { email: username, password: password };

    await doLoginCall.mutateAsync(input, {
      onSuccess(data, variables, context) {
        // salvo il token in local storage.
        const { token } = data;
        setTokenInStorage(token);

        // aggiorno lo stato del contesto.
        setLoading(false);
        setToken(token);
        setError(undefined);
      },
      onError(error, variables, context) {
        // login fallito.
        setLoading(false);
        setError(error.message);
      },
    });
  };

  // ----------------------------------------------------------------------------------------------

  /**
   * Funzione che esegue il logout.
   */

  const doLogout = async (): Promise<void> => {
    // se non si è attualmente loggati, allora non esegue alcuna azione.
    if (isLoading || !token) return;

    setLoading(true);

    // chiamata alle API per eseguire il logout.

    await doLogoutCall.mutateAsync(undefined, {
      onSuccess(data, variables, context) {
        // logout eseguito. Elimino il token salvato dal local storage.
        deleteTokenFromStorage();

        // aggiorno lo stato del contesto.
        setLoading(false);
        setToken(undefined);
        setError(undefined);
      },
      onError(error, variables, context) {
        // logout fallito.
        setLoading(false);
        setError(error.message);
      },
    });
  };

  // ----------------------------------------------------------------------------------------------

  /**
   * Restituisce il contesto.
   */

  const { children } = props;

  const tokenAndData = token && data ? { token, data } : {};
  const state: LoginState = { ...tokenAndData, isLoading, error };
  const functions: LoginFunctions = { doLogin, doLogout };

  const value: LoginContext = { ...state, ...functions };

  return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>;
};

// ----------------------------------------------------------------------------------------------

/**
 * Hook per utilizzare il contesto.
 */

export const useLogin = () => {
  return useContext(LoginContext);
};
