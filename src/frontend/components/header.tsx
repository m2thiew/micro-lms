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
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useLoginPopupForm } from "../features/login/context/popup-form";
import { useLoginStatus } from "../features/login/context/status";
import { PrimaryButton } from "../ui/buttons";
import { FbBookSolid, FbUserCircleSolid } from "../ui/icons/flowbite";

// proprità passate ai componenti.

type AccountLoggedInButtonProps = {
  data: LoginData;
};

// ------------------------------------------------------------------------------------------------

export const Header = (): React.JSX.Element => {
  // navigazione
  const router = useRouter();

  const login = useLoginStatus();
  const loginPopupForm = useLoginPopupForm();

  // gestione menù hamburger
  const [isHamburgerOpen, setHamburgerOpen] = useState(false);

  // CSS pagina selezionata.
  const selectedPageClassName =
    "block rounded bg-blue-700 px-3 py-2 text-white md:bg-transparent md:p-0 md:text-blue-700";
  const notSelectedPageClassName =
    "block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700";

  // CSS contenitore menù hamburger
  const hamburgerClassName = isHamburgerOpen
    ? "w-full items-center justify-between md:order-1 md:flex md:w-auto"
    : "hidden w-full items-center justify-between md:order-1 md:flex md:w-auto";

  // calcolo pagina attuale.
  const isHomeCurrent = router.pathname == "/";
  const isPillCurrent = router.pathname.startsWith("/pill");
  const isAdminCurrent = router.pathname.startsWith("/admin");

  // calcolo visibilità pulsanti.
  const isPillVisible = login.isLoggedIn;
  const isAdminVisible = login.isLoggedIn && login.data.role == "ADMIN";

  return (
    <>
      {/* spazio vuoto per riempire l'altezza occupata dall'header */}
      <div className="h-20"></div>

      {/* barra di header fluttante */}
      <header>
        <nav className="fixed start-0 top-0 z-20 w-full border-b border-gray-200 bg-white">
          <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
            <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
              <FbBookSolid />
              <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
                Micro LMS
              </span>
            </Link>
            <div className="flex space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
              {login.isLoggedIn ? (
                <PrimaryButton
                  onClick={() => {
                    loginPopupForm.open();
                  }}
                  className="inline-flex items-center justify-center gap-1"
                >
                  <FbUserCircleSolid className="h-5" />
                  Benvenuto
                </PrimaryButton>
              ) : (
                <PrimaryButton
                  onClick={() => {
                    loginPopupForm.open();
                  }}
                >
                  accedi
                </PrimaryButton>
              )}

              <button
                data-collapse-toggle="navbar-sticky"
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
                aria-controls="navbar-sticky"
                aria-expanded="false"
                onClick={() => {
                  setHamburgerOpen(!isHamburgerOpen);
                }}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="h-5 w-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
            </div>

            <div className={hamburgerClassName} id="navbar-sticky">
              <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium  md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 rtl:space-x-reverse">
                <li>
                  <Link
                    href="/"
                    className={isHomeCurrent ? selectedPageClassName : notSelectedPageClassName}
                    aria-current={isHomeCurrent ? "page" : undefined}
                    onClick={() => {
                      setHamburgerOpen(false);
                    }}
                  >
                    Home
                  </Link>
                </li>
                {isPillVisible ? (
                  <li>
                    <Link
                      href="/pill/"
                      className={isPillCurrent ? selectedPageClassName : notSelectedPageClassName}
                      aria-current={isPillCurrent ? "page" : undefined}
                      onClick={() => {
                        setHamburgerOpen(false);
                      }}
                    >
                      Pillole
                    </Link>
                  </li>
                ) : null}
                {isAdminVisible ? (
                  <li>
                    <Link
                      href="/admin/"
                      className={isAdminCurrent ? selectedPageClassName : notSelectedPageClassName}
                      aria-current={isAdminCurrent ? "page" : undefined}
                      onClick={() => {
                        setHamburgerOpen(false);
                      }}
                    >
                      Admin
                    </Link>
                  </li>
                ) : null}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

// ------------------------------------------------------------------------------------------------
