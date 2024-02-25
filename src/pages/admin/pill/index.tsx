/**
 * src/pages/admin/pill/index.tsx
 *
 * pagina con l'elenco pillole per gli admin
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import { useLoginStatus } from "@/frontend/features/login/context/status";
import { AdminPillList } from "@/frontend/features/pill/components/admin-list";
import { NewLink, SecondaryLink } from "@/frontend/ui/buttons";
import { FbArrowLeftOutline } from "@/frontend/ui/icons/flowbite";
import { Alert } from "flowbite-react";

// ------------------------------------------------------------------------------------------------

const AdminPillListPage = (): React.JSX.Element => {
  const login = useLoginStatus();

  if (!login.isLoggedIn || login.data.role != "ADMIN") {
    return <Alert color={"failure"}>Accesso negato</Alert>;
  }

  return (
    <>
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-black">Elenco delle pillole</h1>

        <p className="mt-4 text-lg">
          {"Di seguito sono esposti le pillole presenti in piattaforma."}
        </p>
      </div>

      <div className="mt-6">
        <div className="my-4 flex items-end justify-end gap-4">
          <NewLink href="/admin/pill/new">Nuova pillola</NewLink>
        </div>
        <AdminPillList />
      </div>

      <div className="mt-6">
        <SecondaryLink href="/admin" className="inline-flex items-center justify-center gap-2">
          <FbArrowLeftOutline className="h-3 w-4" /> <p>indietro</p>
        </SecondaryLink>
      </div>
    </>
  );
};

export default AdminPillListPage;
