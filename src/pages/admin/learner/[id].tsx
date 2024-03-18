/**
 * src/pages/admin/learner/[id].tsx
 *
 * Pagina admin modifica learner
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import { AdminLearnerUpdateForm } from "@/frontend/features/learner/components/admin-form";
import { SecondaryLink } from "@/frontend/ui/buttons";
import { FbArrowLeftOutline } from "@/frontend/ui/icons/flowbite";
import { ErrorCard } from "@/frontend/ui/status";
import Head from "next/head";
import { useRouter } from "next/router";
import { z } from "zod";

// ------------------------------------------------------------------------------------------------

/**
 * Pagina per la modifica di un learner (id del learner presente nella url)
 * @returns pagina NextJS
 */

const AdminLearnerUpdatePage = (): React.JSX.Element => {
  // recupero parametro [id]
  const router = useRouter();
  const paramId = z.coerce.number().int();

  try {
    const id = paramId.parse(router.query.id);

    <div className="mt-6">
      <AdminLearnerUpdateForm id={router.query.id} />
    </div>;

    return (
      <>
        <Head>
          <title>Modifica learner</title>
        </Head>
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-black">Modifica learner</h1>

          <p className="mt-4 text-lg">
            {
              "Modifica i dati del learner presenti nel form sottostante. Tutti i campi sono obbligatori"
            }
          </p>
        </div>

        <div className="mt-6">
          <AdminLearnerUpdateForm id={id} />
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
  } catch (err) {
    return <ErrorCard error="id learner non valido" />;
  }
};

export default AdminLearnerUpdatePage;
