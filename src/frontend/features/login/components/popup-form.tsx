/**
 * Componenti che espongono il form di popup per eseguire il login.
 */

import { doLoginSchema } from "@/shared/features/login/schema";
import { returnSyncHandler } from "@/shared/utils/async";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Modal } from "flowbite-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoginStatus } from "../context/status";

// ------------------------------------------------------------------------------------------------

export const TestPopup = () => {
  const [show, setShow] = useState<boolean>(false);

  // stato del login.
  const login = useLoginStatus();

  const isLoggedIn = !!login.data;

  // messaggio di caricamento in corso.
  const AlertLoadig = <Alert color="info">caricamento...</Alert>;

  // messaggio di errore.
  const AlertError = <Alert color="failure">{login.error}</Alert>;

  return (
    <>
      <a
        className="cursor-pointer rounded-md bg-blue-500 px-2 py-4 text-white hover:bg-blue-700 hover:ring-2"
        onClick={() => {
          setShow(true);
        }}
      >
        Accedi
      </a>
      <Modal
        show={show}
        onClose={() => {
          setShow(false);
        }}
      >
        <Modal.Header>header</Modal.Header>
        <Modal.Body>
          {login.isLoading ? AlertLoadig : login.error ? AlertError : undefined}

          {isLoggedIn ? <FormDoLogout /> : <FormDoLogin />}
        </Modal.Body>
      </Modal>
    </>
  );
};

// ------------------------------------------------------------------------------------------------

export const FormDoLogin = () => {
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
  const inputClassName =
    "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 disabled:cursor-not-allowed";
  const submitClassName =
    "w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:cursor-progress sm:w-auto";
  // stato del form.
  const disabled = login.isLoading;

  return (
    <>
      <div className="relative block max-w-sm items-center rounded-lg border border-gray-100 bg-white p-6 shadow-md dark:border-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700">
        <div className="bottom-0 left-0 right-0 top-0 bg-gray-500/50"></div>
        <form className="mx-auto max-w-sm" onSubmit={returnSyncHandler(onSubmit)}>
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
            {formError.password && (
              <span className="text-red-500">{formError.password.message}</span>
            )}
          </div>

          <button type="submit" className={submitClassName} disabled={disabled}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

// ------------------------------------------------------------------------------------------------

export const FormDoLogout = () => {
  // stato del login.
  const login = useLoginStatus();

  if (!login.data) {
    return <p>dati non disponibili</p>;
  }

  const { email, role, expire } = login.data;

  return (
    <>
      <div className="max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Benvenuto {email}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Il tuo ruolo: <b>{role}</b>
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          scadenza del login: <b>{expire.toLocaleString()}</b>
        </p>
        <a
          className="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
          onClick={() => {
            login.doLogout();
          }}
        >
          logout
        </a>
      </div>
    </>
  );
};
