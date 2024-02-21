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
import { NewButton } from "@/frontend/ui/buttons";
import { Alert } from "flowbite-react";

// ------------------------------------------------------------------------------------------------

const AdminPillListPage = (): React.JSX.Element => {
  const login = useLoginStatus();

  if (!login.isLoggedIn || login.data.role != "ADMIN") {
    return <Alert color={"failure"}>Accesso negato</Alert>;
  }

  return (
    <>
      <div className="mx-auto w-full px-5 py-12 lg:w-[64rem]">
        <h1 className="text-2xl font-bold text-black">Elenco pillole</h1>
        <p>...</p>
        <div className="my-4 flex items-end justify-end gap-4">
          <NewButton href="/admin/pill/new">Nuova pillola</NewButton>
        </div>
        <AdminPillList />
      </div>
    </>
  );
};

export default AdminPillListPage;
