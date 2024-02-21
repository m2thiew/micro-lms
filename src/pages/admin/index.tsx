/**
 * src/pages/admin/index.ts
 *
 * Pagina iniziale per gli amministratori.
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import { useLoginStatus } from "@/frontend/features/login/context/status";
import { FbNewspapperOutline, FbUserSolid } from "@/frontend/ui/icons/flowbite";
import { Alert } from "flowbite-react";
import Link from "next/link";
import React from "react";

// ------------------------------------------------------------------------------------------------

const AdminPage = (): React.JSX.Element => {
  const login = useLoginStatus();

  if (!login.isLoggedIn || login.data.role != "ADMIN") {
    return <Alert color={"failure"}>Accesso negato</Alert>;
  }

  return (
    <>
      <div className="mx-auto w-full px-5 py-12 lg:w-[64rem]">
        <div className="flex items-center justify-center gap-12">
          <div className="h-64 w-64 text-center">
            <Link
              href={"/admin/learner"}
              className="block rounded-lg border border-gray-200 bg-white p-6 shadow hover:bg-gray-100"
            >
              <div className="flex w-full items-center justify-center py-4">
                <FbUserSolid className="h-24 w-24" />
              </div>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Gestione learner
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Crea e modifica gli utenti.
              </p>
            </Link>
          </div>

          <div className="h-64 w-64 text-center">
            <Link
              href={"/admin/pill"}
              className="block rounded-lg border border-gray-200 bg-white p-6 shadow hover:bg-gray-100"
            >
              <div className="flex w-full items-center justify-center py-4">
                <FbNewspapperOutline className="h-24 w-24" />
              </div>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Gestione pillole
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Crea e modifica le pillole e i loro contenuti.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
