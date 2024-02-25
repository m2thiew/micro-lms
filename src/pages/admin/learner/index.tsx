/**
 * src/pages/admin/learner/index.tsx
 *
 * Elenco dei learner.
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import { AdminLearnersList } from "@/frontend/features/learner/components/admin-list";
import { useLoginStatus } from "@/frontend/features/login/context/status";
import { NewLink, PrimaryLink, SecondaryLink } from "@/frontend/ui/buttons";
import { FbArrowLeftOutline } from "@/frontend/ui/icons/flowbite";
import { Alert } from "flowbite-react";

// ------------------------------------------------------------------------------------------------

/**
 * Pagina con l'elenco dei learner creati (id del learner presente nella url)
 * @returns pagina NextJS
 */

const LearnerList = (): React.JSX.Element => {
  const login = useLoginStatus();

  if (!login.isLoggedIn || login.data.role != "ADMIN") {
    return <Alert color={"failure"}>Accesso negato</Alert>;
  }

  return (
    <>
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-black">Elenco dei learner</h1>

        <p className="mt-4 text-lg">
          {"Di seguito sono esposti i learner presenti in piattaforma."}
        </p>
      </div>

      <div className="mt-6">
        <div className="my-4 flex items-end justify-end gap-4">
          <NewLink href="/admin/learner/new">Nuovo learner</NewLink>
        </div>
        <AdminLearnersList />
      </div>

      <div className="mt-6">
        <SecondaryLink href="/admin" className="inline-flex items-center justify-center gap-2">
          <FbArrowLeftOutline className="h-3 w-4" /> <p>indietro</p>
        </SecondaryLink>
      </div>
    </>
  );
};

export default LearnerList;
