/**
 * Componenti che espongono il form di popup per eseguire il login.
 */

import { schemaDoLogin } from "@/shared/features/login/schema";
import { returnSyncHandler } from "@/shared/utils/async";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { Alert, Modal } from "flowbite-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLogin } from "../context";

// ------------------------------------------------------------------------------------------------

export const TestPopup = () => {
  const [show, setShow] = useState<boolean>(false);

  // stato del login.
  const login = useLogin();

  const isLoggedIn = !!login.data;

  console.log("TestPopup", login);

  // messaggio di caricamento in corso.
  const AlertLoadig = <Alert color="info">caricamento...</Alert>;

  // messaggio di errore.
  const AlertError = <Alert color={"error"}>{login.error}</Alert>;

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
  const login = useLogin();

  // gestione form di login.
  const form = useForm<schemaDoLogin>({
    resolver: zodResolver(schemaDoLogin, {}),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const formError = form.formState.errors;

  // azione di submit.
  const onSubmit = form.handleSubmit(async (input) => {
    // chiamata alle API per eseguire il login.
    await login.doLogin(input.email, input.password);
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
  const login = useLogin();

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
          scadenza del login: <b>{expire.toLocaleDateString()}</b>
        </p>
        <a
          className="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
          onClick={() => {
            void login.doLogout();
          }}
        >
          logout
        </a>
      </div>
    </>
  );
};
