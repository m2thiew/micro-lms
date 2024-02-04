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
import { ErrorCard } from "@/frontend/ui/status";
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

    return (
      <>
        <div className="mx-auto w-full px-5 py-12 lg:w-[64rem]">
          <h1 className="text-2xl font-bold text-black">Modifica learner</h1>
          <p>...</p>
          <AdminLearnerUpdateForm id={id} />
        </div>
      </>
    );
  } catch (err) {
    return <ErrorCard error="id learner non valido" />;
  }
};

export default AdminLearnerUpdatePage;
