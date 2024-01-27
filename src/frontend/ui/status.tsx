/**
 * src/frontend/ui/page-status.tsx
 *
 * Componenti usati per mostrare lo stato della pagina
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import { FbSpinner } from "./icons/extra";
import { FbCloseCircleSolid } from "./icons/flowbite";

type PageErrorProps = {
  title?: string;
  error?: string;
};

// ------------------------------------------------------------------------------------------------

/**
 * Spinner per indicare la pagina in caricamento.
 *
 * @returns div con spinner
 */

export const LoadingBar = (): React.JSX.Element => {
  // const learners = apiClient.learner.getLearnerList.useQuery();

  return (
    <div className="flex h-24 w-full items-center justify-center gap-4">
      <div role="status">
        <FbSpinner className="h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600" />
      </div>
      <p>Caricamento...</p>
    </div>
  );
};

// ------------------------------------------------------------------------------------------------

/**
 * Blocco che avvisa che si è verificato un errore
 *
 * @param props.title titolo del blocco
 * @param props.error descrizione dell'errore
 * @returns div con esposto l'errore
 */

export const ErrorCard = (props: PageErrorProps): React.JSX.Element => {
  const title = props.title ?? "si è verificato un errore";
  const error = props.error ?? "impossibile eseguire l'azione richiesta";

  return (
    <div className="flex h-64 w-full items-center justify-center">
      <div className="block rounded-lg border  bg-white p-6 shadow hover:bg-gray-100">
        <div className="flex w-full items-center justify-center py-4">
          <FbCloseCircleSolid className="h-24 w-24 text-red-800" />
        </div>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-red-800 ">{title}</h5>
        <p className="font-normal text-gray-700">{error}</p>
      </div>
    </div>
  );
};
