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
import { SecondaryLink } from "@/frontend/ui/buttons";
import { FbArrowLeftOutline } from "@/frontend/ui/icons/flowbite";
import React from "react";

// ------------------------------------------------------------------------------------------------

/**
 * Pagina con il form per creare un nuovo learner
 * @returns pagina NextJS
 */

const AdminPillCreatePage = (): React.JSX.Element => {
  return (
    <>
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-black">Nuova pillola</h1>

        <p className="mt-4 text-lg">
          {"Compila il form sottostante per creare una nuova pillola."}
        </p>
      </div>

      <div className="mt-6">
        <AdminPillCreateForm />
      </div>

      <div className="mt-6">
        <SecondaryLink href="/admin/pill" className="inline-flex items-center justify-center gap-2">
          <FbArrowLeftOutline className="h-3 w-4" /> <p>indietro</p>
        </SecondaryLink>
      </div>
    </>
  );
};

export default AdminPillCreatePage;
