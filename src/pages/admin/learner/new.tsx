/**
 * src/pages/admin/learner/new.tsx
 *
 * pagina per creare un nuovo learner
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import { AdminLearnerCreateForm } from "@/frontend/features/learner/components/admin-form";
import React from "react";

// ------------------------------------------------------------------------------------------------

/**
 * Pagina con il form per creare un nuovo learner
 * @returns pagina NextJS
 */

const AdminLearnerCreatePage = (): React.JSX.Element => {
  return (
    <>
      <div className="mx-auto w-full px-5 py-12 lg:w-[64rem]">
        <h1 className="text-2xl font-bold text-black">Nuovo learner</h1>
        <p>...</p>
        <AdminLearnerCreateForm />
      </div>
    </>
  );
};

export default AdminLearnerCreatePage;
