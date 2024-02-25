/**
 * src/pages/pill/[id].tsx
 *
 * pagina di dettaglio di una pillola
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import { useLoginStatus } from "@/frontend/features/login/context/status";
import { PillContent } from "@/frontend/features/pill/components/content";
import { SecondaryLink } from "@/frontend/ui/buttons";
import { FbArrowLeftOutline } from "@/frontend/ui/icons/flowbite";
import { ErrorCard } from "@/frontend/ui/status";
import { Alert } from "flowbite-react";
import { useRouter } from "next/router";
import { z } from "zod";

// ------------------------------------------------------------------------------------------------

const AdminPillUpdatePage = (): React.JSX.Element => {
  const login = useLoginStatus();

  // recupero parametro [id]
  const router = useRouter();
  const paramId = z.coerce.number().int();

  if (!login.isLoggedIn) return <Alert color={"failure"}>Accesso negato</Alert>;

  try {
    const id = paramId.parse(router.query.id);

    return (
      <>
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-black">Dettaglio pillola</h1>

          <p className="mt-4 text-lg">{"Visualizza il contenuto della pillola."}</p>
        </div>

        <div className="mt-6">
          <PillContent id={id} />
        </div>

        <div className="mt-6">
          <SecondaryLink href="/pill" className="inline-flex items-center justify-center gap-2">
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
