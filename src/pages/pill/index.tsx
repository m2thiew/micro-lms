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
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-black">Le tue pillole</h1>

        <p className="mt-4 text-lg">{"Di seguito sono esposte le tue pillole da fruire."}</p>
      </div>

      <div className="mt-6">
        <LearnerSubscribedPillList />
      </div>
    </>
  );
};

export default LearnerSubscribedPillPage;

// ------------------------------------------------------------------------------------------------
