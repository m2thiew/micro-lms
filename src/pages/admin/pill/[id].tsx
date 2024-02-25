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
import { SecondaryLink } from "@/frontend/ui/buttons";
import { FbArrowLeftOutline } from "@/frontend/ui/icons/flowbite";
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
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-black">Modifica pillola</h1>

          <p className="mt-4 text-lg">
            {"Modifica i dati della pillola presenti nel form sottostante."}
          </p>
        </div>

        <div className="mt-6">
          <AdminPillUpdateForm id={id} />
        </div>

        <div className="mt-6">
          <SecondaryLink
            href="/admin/pill"
            className="inline-flex items-center justify-center gap-2"
          >
            <FbArrowLeftOutline className="h-3 w-4" /> <p>indietro</p>
          </SecondaryLink>
        </div>
      </>
    );
  } catch (err) {
    return <ErrorCard error="id pillola non valido" />;
  }
};

export default AdminPillUpdatePage;

// ------------------------------------------------------------------------------------------------
