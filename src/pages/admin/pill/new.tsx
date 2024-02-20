/**
 * src/pages/admin/pill/new.tsx
 *
 * pagina per creare una nuova pillola
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import { AdminPillCreateForm } from "@/frontend/features/pill/components/admin-form";
import React from "react";

// ------------------------------------------------------------------------------------------------

/**
 * Pagina con il form per creare un nuovo learner
 * @returns pagina NextJS
 */

const AdminPillCreatePage = (): React.JSX.Element => {
  return (
    <>
      <div className="mx-auto w-full px-5 py-12 lg:w-[64rem]">
        <h1 className="text-2xl font-bold text-black">Nuova pillola</h1>
        <p>...</p>
        <AdminPillCreateForm />
      </div>
    </>
  );
};

export default AdminPillCreatePage;
