/**
 * src/pages/pill/[id].tsx
 *
 * pagina di dettaglio di una pillola
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import { PillContent } from "@/frontend/features/pill/components/content";
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
          <h1 className="text-2xl font-bold text-black">Dettaglio pillola</h1>
          <p>...</p>
          <PillContent id={id} />
        </div>
      </>
    );
  } catch (err) {
    return <ErrorCard error="id pillola non valido" />;
  }
};

export default AdminPillUpdatePage;

// ------------------------------------------------------------------------------------------------
