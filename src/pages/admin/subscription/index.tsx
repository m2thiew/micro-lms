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
import { SecondaryLink } from "@/frontend/ui/buttons";
import { FbArrowLeftOutline } from "@/frontend/ui/icons/flowbite";
import { Alert } from "flowbite-react";
import Head from "next/head";

// ------------------------------------------------------------------------------------------------

const AdminSubscriptionsListPage = (): React.JSX.Element => {
  const login = useLoginStatus();

  if (!login.isLoggedIn || login.data.role != "ADMIN") {
    return <Alert color={"failure"}>Accesso negato</Alert>;
  }

  return (
    <>
      <Head>
        <title>Elenco assegnazioni</title>
      </Head>
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-black">Elenco assegnazioni</h1>

        <p className="mt-4 text-lg">
          {
            "Di seguito sono esposti i learner con i dati sulle pillole assegnate a ciascuno di essi."
          }
        </p>
      </div>

      <div className="mt-6">
        <AdminSubscriptionsList />
      </div>

      <div className="mt-6">
        <SecondaryLink href="/admin" className="inline-flex items-center justify-center gap-2">
          <FbArrowLeftOutline className="h-3 w-4" /> <p>indietro</p>
        </SecondaryLink>
      </div>
    </>
  );
};

export default AdminSubscriptionsListPage;
