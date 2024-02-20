/**
 * src/pages/admin/pill/[id].tsx
 *
 * Pagina admin modifica pillola
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import { AdminPillUpdateForm } from "@/frontend/features/pill/components/admin-form";
import { ErrorCard } from "@/frontend/ui/status";
import { useRouter } from "next/router";
import { z } from "zod";

// ------------------------------------------------------------------------------------------------

const AdminPillUpdatePage = (): React.JSX.Element => {
  // recupero parametro [id]
  const router = useRouter();
  const paramId = z.coerce.number().int();

  try {
    const id = paramId.parse(router.query.id);

    return (
      <>
        <div className="mx-auto w-full px-5 py-12 lg:w-[64rem]">
          <h1 className="text-2xl font-bold text-black">Modifica pillola</h1>
          <p>...</p>
          <AdminPillUpdateForm id={id} />
        </div>
      </>
    );
  } catch (err) {
    return <ErrorCard error="id pillola non valido" />;
  }
};

export default AdminPillUpdatePage;

// ------------------------------------------------------------------------------------------------
