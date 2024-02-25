/**
 * src/frontend/features/learner/components/admin-list.tsx
 *
 * Elenco dei learner esposto agli amministratori.
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import { defaultColumnsDefinition, defaultGridOptions } from "@/frontend/lib/ag-grid";
import { apiClient } from "@/frontend/lib/trpc/client";
import { DeleteLink, EditLink } from "@/frontend/ui/buttons";
import { ErrorCard, LoadingBar } from "@/frontend/ui/status";
import { type LearnerAdminData } from "@/shared/features/learner/schema";
import { type ColDef, type GetRowIdFunc } from "@ag-grid-community/core";
import { AgGridReact, type CustomCellRendererProps } from "@ag-grid-community/react";
import { Tooltip } from "flowbite-react";

// ------------------------------------------------------------------------------------------------

/**
 * Componente che espone l'elenco dei learner per gli amministratori
 * @returns componente react
 */

export const AdminLearnersList = (): React.JSX.Element => {
  // chiamate api.
  const learners = apiClient.adminLearner.list.useQuery();
  const deleteLearner = apiClient.adminLearner.delete.useMutation();
  const apiCache = apiClient.useUtils();

  if (learners.isLoading) return <LoadingBar />;
  if (learners.error) return <ErrorCard error={learners.error.message} />;

  // azione per i pulsanti "Elimina" presente in elenco.
  const handleDeleteLearner = (id: number, name: string, surname: string) => {
    return () => {
      if (confirm(`Si è veramente sicuri di eliminare il learner ${name} ${surname}?`)) {
        deleteLearner
          .mutateAsync({ id })
          .then(() => {
            void apiCache.adminLearner.invalidate();
          })
          .catch((err) => {
            console.error(err);
          });
      }
    };
  };

  // Cella con i pulsanti di modifica.
  const renderActionsButton = (params: CustomCellRendererProps<LearnerAdminData>) => {
    if (!params.data) return null;

    const { id, name, surname } = params.data;

    return (
      <div className="m-0 flex h-10 items-center gap-1 p-0">
        <EditLink className="h-7 px-2 text-sm" href={`/admin/learner/${id}`} />
        <DeleteLink className="h-7 px-2 text-sm" onClick={handleDeleteLearner(id, name, surname)} />
      </div>
    );
  };

  // Colonne esposte in elenco.
  const columnsDefinition: ColDef<LearnerAdminData>[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Nome" },
    { field: "surname", headerName: "Cognome" },
    { field: "email", headerName: "E-Mail" },
    {
      field: "id",
      headerName: "Azioni",
      cellRenderer: renderActionsButton,
    },
  ];

  const getRowId: GetRowIdFunc<LearnerAdminData> = (row) => `${row.data.id}`;

  return (
    <div className="ag-theme-quartz h-96 w-full">
      <AgGridReact
        rowData={learners.data}
        columnDefs={columnsDefinition}
        getRowId={getRowId}
        pagination={true}
        defaultColDef={defaultColumnsDefinition}
        gridOptions={defaultGridOptions}
      />
    </div>
  );
};
