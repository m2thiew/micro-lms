/**
 * src/frontend/features/login/contex/popup-form.tsx
 *
 * Contesto che espone il form popup di login (apribile/ chiudibile da qualsiasi pagina
 * della applicazione)
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import { DangerButton, PrimaryLink, SubmitButton } from "@/frontend/ui/buttons";
import { FbBookSolid } from "@/frontend/ui/icons/flowbite";
import { doLoginSchema } from "@/shared/features/login/schema";
import { returnSyncHandler } from "@/shared/utils/async";
import { doNothingSync } from "@/shared/utils/void";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { Alert, Modal } from "flowbite-react";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useLoginStatus } from "./status";

// ------------------------------------------------------------------------------------------------

// Proprietà passate al contesto.
type ProviderProps = {
  children: React.ReactNode;
};

// Funzioni esposte dal contesto.
type LoginPopupFormContex = {
  open: () => void;
  close: () => void;
  toggle: () => void;
  isOpen: boolean;
};

// Valore di default.
const defaultValue: LoginPopupFormContex = {
  open: doNothingSync,
  close: doNothingSync,
  toggle: doNothingSync,
  isOpen: false,
};

// ------------------------------------------------------------------------------------------------

/**
 * Contesto per esporre il form di login popup.
 */

export const LoginPopupFormContex = React.createContext<LoginPopupFormContex>(defaultValue);

// ------------------------------------------------------------------------------------------------

/**
 * Implementazione del contesto.
 */

export const LoginPopupFormProvider = (props: ProviderProps): React.JSX.Element => {
  // visibilità del popup.
  const [isOpen, setOpen] = useState<boolean>(false);

  // stato del login.
  const login = useLoginStatus();

  // messaggio di caricamento in corso.
  const AlertLoadig = <Alert color="info">caricamento...</Alert>;

  // messaggio di errore.
  const AlertError = (
    <Alert
      color="failure"
      onDismiss={() => {
        login.clearError();
      }}
    >
      {login.error}
    </Alert>
  );

  // funzioni esposte per aprire/chiudere il popup.
  const open = () => {
    setOpen(true);
  };
  const close = () => {
    setOpen(false);
  };
  const toggle = () => {
    setOpen(!isOpen);
  };

  const value: LoginPopupFormContex = {
    open,
    close,
    toggle,
    isOpen,
  };

  return (
    <LoginPopupFormContex.Provider value={value}>
      <Modal
        show={isOpen}
        onClose={() => {
          setOpen(false);
        }}
        size={"md"}
      >
        <Modal.Header>Login</Modal.Header>
        <Modal.Body>
          <div className="flex flex-col gap-2">
            {login.isLoading ? AlertLoadig : login.error ? AlertError : undefined}

            <div className="flex-none">{login.isLoggedIn ? <FormDoLogout /> : <FormDoLogin />}</div>
          </div>
        </Modal.Body>
      </Modal>
      {props.children}
    </LoginPopupFormContex.Provider>
  );
};

// ------------------------------------------------------------------------------------------------

/**
 * Espone il form per inserire email e password per eseguire il login
 *
 * @returns form di login
 */

export const FormDoLogin = (): React.JSX.Element => {
  // stato del login.
  const login = useLoginStatus();

  // gestione form di login.
  const form = useForm<doLoginSchema>({
    resolver: zodResolver(doLoginSchema, {}),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const formError = form.formState.errors;

  // azione di submit.
  const onSubmit = form.handleSubmit((input) => {
    // chiamata alle API per eseguire il login.
    login.doLogin(input.email, input.password);
  });

  // classi CSS
  const inputClassName = clsx(
    "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 disabled:cursor-not-allowed",
  );
  const submitClassName = clsx(
    "w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:cursor-progress sm:w-auto",
  );

  // stato del form.
  const disabled = login.isLoading;

  return (
    <>
      <form className="mx-auto  " onSubmit={returnSyncHandler(onSubmit)}>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            E-Mail
          </label>
          <input
            type="email"
            className={inputClassName}
            {...form.register("email")}
            disabled={disabled}
          />
          {formError.email && <span className="text-red-500">{formError.email.message}</span>}
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            className={inputClassName}
            {...form.register("password")}
            disabled={disabled}
          />
          {formError.password && <span className="text-red-500">{formError.password.message}</span>}
        </div>

        <SubmitButton disabled={disabled}>Accedi</SubmitButton>
      </form>
    </>
  );
};

// ------------------------------------------------------------------------------------------------

/**
 * Espone le informazioni dell'utente loggato e il pulsante per il logout
 *
 * @returns dati dell'utente & pulsante logout
 */

export const FormDoLogout = (): React.JSX.Element => {
  // stato del login.
  const login = useLoginStatus();
  const loginPopupForm = useLoginPopupForm();

  if (!login.data) {
    return <p>dati non disponibili</p>;
  }

  const { email, role, expire, name, surname } = login.data;

  return (
    <>
      <div>
        <h5 className="text-gray-90 text-2xl font-bold tracking-tight text-black ">
          Benvenuto {name} {surname}
        </h5>

        <p className="mt-4 text-lg text-gray-900">
          Il tuo ruolo: <b>{role}</b>
        </p>
        <p className="mt-4 text-lg text-gray-900">
          Scadenza del login: <b>{expire.toLocaleString()}</b>
        </p>

        <div className="mt-4 flex items-center justify-center gap-4">
          <PrimaryLink
            className=" inline-flex items-center justify-center gap-1"
            href="/pill/"
            onClick={() => {
              loginPopupForm.close();
            }}
          >
            <FbBookSolid /> Guarda le tue pillole
          </PrimaryLink>
          <DangerButton
            onClick={() => {
              login.doLogout();
              loginPopupForm.close();
            }}
          >
            logout
          </DangerButton>
        </div>
      </div>
    </>
  );
};

// ------------------------------------------------------------------------------------------------

/**
 * Hook per usare il contesto del form popup di login
 *
 * @returns contesto form popup di login
 */

export const useLoginPopupForm = () => {
  return useContext(LoginPopupFormContex);
};
