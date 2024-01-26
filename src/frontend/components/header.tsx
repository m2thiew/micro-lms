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
import React from "react";
import { useLoginPopupForm } from "../features/login/context/popup-form";
import { useLoginStatus } from "../features/login/context/status";
import { FbCogOutline, FbUserCircleOutline, FbUserCircleSolid } from "../ui/icons/FlowbiteIcons";

// proprità passate ai componenti.

type AccountLoggedInButtonProps = {
  data: LoginData;
};

// ------------------------------------------------------------------------------------------------

export const HeaderContent = (): React.JSX.Element => {
  const login = useLoginStatus();

  // pulsante di account
  const accountButton = login.isLoggedIn ? (
    <AccountLoggedInButton data={login.data} />
  ) : (
    <AccountNotLoggedButton />
  );

  // Pulsanter per le pillole.
  const pillButton = (
    <a
      href="#"
      className="ml-2 inline-flex cursor-pointer items-center gap-2 rounded-lg px-5 py-2.5 font-medium text-white hover:bg-slate-700/20"
      onClick={() => {
        alert("pillole");
      }}
    >
      <p className="text-xl">Pillole</p>
    </a>
  );

  // Pulsante per area amministratore.
  const adminButton =
    login.isLoggedIn && login.data.role == "ADMIN" ? (
      <a
        href="#"
        className="ml-2 inline-flex cursor-pointer items-center gap-2 rounded-lg px-5 py-2.5 font-medium text-white hover:bg-slate-700/20"
        onClick={() => {
          alert("admin");
        }}
      >
        <FbCogOutline className="h-8 w-8" />
        <p className="text-xl">Admin</p>
      </a>
    ) : null;

  return (
    <div className="flex h-full w-full justify-start gap-4 align-middle">
      {accountButton}
      {pillButton}
      {adminButton}
    </div>
  );
};

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
