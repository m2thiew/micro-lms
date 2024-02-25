/**
 * src/pages/admin/subscription/[id].tsx
 *
 * pagina admin assegnazione pillola ad uno specifico learner
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import { AdminSubscriptionSetForm } from "@/frontend/features/subscription/components/admin-form";
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

const AdminSubscriptionSetPage = (): React.JSX.Element => {
  // recupero parametro [id]
  const router = useRouter();
  const paramId = z.coerce.number().int();

  try {
    const id = paramId.parse(router.query.id);

    return (
      <>
        <Head>
          <title>Assegna pillole</title>
        </Head>
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-black">Assegna pillole</h1>

          <p className="mt-4 text-lg">
            {"Utilizza le checkbox esposte per assegnare al learner le pillole da fruire."}
          </p>
        </div>

        <div className="mt-6">
          <AdminSubscriptionSetForm learnerId={id} />
        </div>

        <div className="mt-6">
          <SecondaryLink
            href="/admin/subscription"
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

export default AdminSubscriptionSetPage;
