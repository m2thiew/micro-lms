/**
 * src/frontend/components/header.tsx
 *
 * Espone il contenuto della barra header del sito
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import { type LoginData } from "@/shared/features/login/utils/jwt";
import Link from "next/link";
import React from "react";
import { useLoginPopupForm } from "../features/login/context/popup-form";
import { useLoginStatus } from "../features/login/context/status";
import { FbCogOutline, FbUserCircleOutline, FbUserCircleSolid } from "../ui/icons/flowbite";

// proprità passate ai componenti.

type AccountLoggedInButtonProps = {
  data: LoginData;
};

// ------------------------------------------------------------------------------------------------

export const Header = (): React.JSX.Element => {
  const login = useLoginStatus();

  // pulsante di account
  const accountButton = login.isLoggedIn ? (
    <AccountLoggedInButton data={login.data} />
  ) : (
    <AccountNotLoggedButton />
  );

  // Pulsanter per le pillole.
  const pillButton = (
    <Link
      href="/pill/"
      className="ml-2 inline-flex cursor-pointer items-center gap-2 rounded-lg px-5 py-2.5 font-medium text-white hover:bg-slate-700/20"
      onClick={() => {
        alert("pillole");
      }}
    >
      <p className="text-xl">Pillole</p>
    </Link>
  );

  // Pulsante per area amministratore.
  const adminButton =
    login.isLoggedIn && login.data.role == "ADMIN" ? (
      <Link
        href="/admin"
        className="ml-2 inline-flex cursor-pointer items-center gap-2 rounded-lg px-5 py-2.5 font-medium text-white hover:bg-slate-700/20"
      >
        <FbCogOutline className="h-8 w-8" />
        <p className="text-xl">Admin</p>
      </Link>
    ) : null;

  return (
    <header className="m-0 h-24 w-full bg-blue-500 p-0 text-white">
      <div className="flex h-full w-full justify-start gap-4 align-middle">
        {accountButton}
        {pillButton}
        {adminButton}
      </div>
    </header>
  );
};

// ------------------------------------------------------------------------------------------------

const AccountNotLoggedButton = () => {
  const loginPopupForm = useLoginPopupForm();
  return (
    <a
      href="#"
      className="ml-2 inline-flex cursor-pointer items-center gap-2 rounded-lg px-5 py-2.5 font-medium text-white hover:bg-slate-700/20"
      onClick={() => {
        loginPopupForm.open();
      }}
    >
      <FbUserCircleOutline className="h-8 w-8" />
      <p className="text-xl">Accedi</p>
    </a>
  );
};

// ------------------------------------------------------------------------------------------------

const AccountLoggedInButton = ({ data }: AccountLoggedInButtonProps) => {
  const loginPopupForm = useLoginPopupForm();

  return (
    <a
      href="#"
      className="ml-2 inline-flex cursor-pointer items-center gap-2 rounded-lg px-5 py-2.5 font-medium text-white hover:bg-slate-700/20"
      onClick={() => {
        loginPopupForm.open();
      }}
    >
      <FbUserCircleSolid className="h-8 w-8" />
      <p className="text-xl">
        {data.name} {data.surname}
      </p>
    </a>
  );
};
