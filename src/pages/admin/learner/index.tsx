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
import { Alert } from "flowbite-react";

// ------------------------------------------------------------------------------------------------

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
        <AdminLearnersList />
      </div>
    </>
  );
};

export default LearnerList;
