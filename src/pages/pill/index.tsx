/**
 * src/pages/pill/index.tsx
 *
 * pagina con l'elenco delle pillole del learner loggato.
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import { useLoginStatus } from "@/frontend/features/login/context/status";
import { LearnerSubscribedPillList } from "@/frontend/features/pill/components/learner-list";
import { Alert } from "flowbite-react";
import { use } from "react";

// ------------------------------------------------------------------------------------------------

const LearnerSubscribedPillPage = (): React.JSX.Element => {
  const login = useLoginStatus();

  if (!login.isLoggedIn) return <Alert color={"failure"}>Accesso negato</Alert>;

  return (
    <>
      <div className="mx-auto w-full px-5 py-12 lg:w-[64rem]">
        <h1 className="text-2xl font-bold text-black">Elenco delle tue pillole</h1>
        <p>...</p>
        <LearnerSubscribedPillList />
      </div>
    </>
  );
};

export default LearnerSubscribedPillPage;

// ------------------------------------------------------------------------------------------------
