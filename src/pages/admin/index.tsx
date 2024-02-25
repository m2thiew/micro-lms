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
import { PillCard } from "@/frontend/features/pill/components/card";
import {
  FbBookOutline,
  FbBookSolid,
  FbNewspapperOutline,
  FbRectangleListOutline,
  FbUserSolid,
} from "@/frontend/ui/icons/flowbite";
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
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-black">Pannello amministrazione</h1>

        <p className="mt-4 text-lg">
          {
            "Gestisci l'elenco dei learner e delle pillole presenti in piattaforma. Assegna ad ogni learner le proprie pillole da fruire."
          }
        </p>
      </div>
      <div className="mt-6 flex flex-wrap items-stretch justify-center gap-12">
        <PillCard
          id={0}
          title="Gestione learner"
          description="Crea e modifica i learner"
          thumbSvg={<FbUserSolid className="h-32 w-32" />}
          href={"/admin/learner"}
        />

        <PillCard
          id={1}
          title="Gestione pillole"
          description="Crea e modifica le pillole e i loro contenuti"
          thumbSvg={<FbBookSolid className="h-32 w-32" />}
          href={"/admin/pill"}
        />

        <PillCard
          id={2}
          title="Assegnazione pillole"
          description="Assegna ai learner le pillole da fruire"
          thumbSvg={<FbRectangleListOutline className="h-32 w-32" />}
          href={"/admin/subscription"}
        />
      </div>
    </>
  );
};

export default AdminPage;
