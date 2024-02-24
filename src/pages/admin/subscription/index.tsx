/**
 * src/pages/admin/subscription/index.tsx
 *
 * pagina con l'elenco delle assegnazioni
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import { useLoginStatus } from "@/frontend/features/login/context/status";
import { AdminSubscriptionsList } from "@/frontend/features/subscription/components/admin-list";
import { Alert } from "flowbite-react";

// ------------------------------------------------------------------------------------------------

const AdminSubscriptionsListPage = (): React.JSX.Element => {
  const login = useLoginStatus();

  if (!login.isLoggedIn || login.data.role != "ADMIN") {
    return <Alert color={"failure"}>Accesso negato</Alert>;
  }

  return (
    <>
      <div className="mx-auto w-full px-5 py-12 lg:w-[64rem]">
        <h1 className="text-2xl font-bold text-black">Assegnazione pillole</h1>
        <p>...</p>
        <AdminSubscriptionsList />
      </div>
    </>
  );
};

export default AdminSubscriptionsListPage;
