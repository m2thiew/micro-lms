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
import { NewButton } from "@/frontend/ui/buttons";
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
      <div className="mx-auto w-full px-5 py-12 lg:w-[64rem]">
        <h1 className="text-2xl font-bold text-black">Gestione learner</h1>
        <p>...</p>
        <div className="my-4 flex items-end justify-end gap-4">
          <NewButton href="/admin/learner/new">Nuovo learner</NewButton>
        </div>
        <AdminLearnersList />
      </div>
    </>
  );
};

export default LearnerList;
