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
import { SecondaryLink } from "@/frontend/ui/buttons";
import { FbArrowLeftOutline } from "@/frontend/ui/icons/flowbite";
import Head from "next/head";
import React from "react";

// ------------------------------------------------------------------------------------------------

/**
 * Pagina con il form per creare un nuovo learner
 * @returns pagina NextJS
 */

const AdminLearnerCreatePage = (): React.JSX.Element => {
  return (
    <>
      <Head>
        <title>Nuovo learner</title>
      </Head>
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-black">Nuovo learner</h1>

        <p className="mt-4 text-lg">
          {
            "Compila il form sottostante per creare un nuovo learner. Tutti i campi sono obbligatori"
          }
        </p>
      </div>

      <div className="mt-6">
        <AdminLearnerCreateForm />
      </div>

      <div className="mt-6">
        <SecondaryLink
          href="/admin/learner"
          className="inline-flex items-center justify-center gap-2"
        >
          <FbArrowLeftOutline className="h-3 w-4" /> <p>indietro</p>
        </SecondaryLink>
      </div>
    </>
  );
};

export default AdminLearnerCreatePage;
