/**
 * src/frontend/features/subscription/components/admin-list.tsx
 *
 * lista delle assegnazioni pillole per gli admin.
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import { defaultColumnsDefinition } from "@/frontend/lib/ag-grid";
import { apiClient } from "@/frontend/lib/trpc/client";
import { EditButton } from "@/frontend/ui/buttons";
import { ErrorCard, LoadingBar } from "@/frontend/ui/status";
import { type LearnerAdminData } from "@/shared/features/learner/schema";
import { type ColDef, type GetRowIdFunc, type ValueFormatterParams } from "@ag-grid-community/core";
import { AgGridReact, type CustomCellRendererProps } from "@ag-grid-community/react";

// ------------------------------------------------------------------------------------------------

/**
 * Lista con stastitiche delle pillole assegnate ai learner
 * @returns componente lista
 */
export const AdminSubscriptionsList = (): React.JSX.Element => {
  // chiamate api.
  const learners = apiClient.adminLearner.list.useQuery();
  const apiCache = apiClient.useUtils();

  if (learners.isLoading) return <LoadingBar />;
  if (learners.error) return <ErrorCard error={learners.error.message} />;

  // Espone nome e cognome separati in un'unica cella.
  const formatFullName = (params: ValueFormatterParams<LearnerAdminData>): string => {
    if (!params.data) return "-";

    return `${params.data.name} ${params.data.surname}`;
  };

  // Espone il numero di pillole assegnate.
  const formatPillNumber = (params: ValueFormatterParams<LearnerAdminData>): string => {
    if (!params.data) return "-";

    return `${params.data.pillsId.length}`;
  };

  // Cella con i pulsanti di modifica.
  const renderActionsButton = (params: CustomCellRendererProps<LearnerAdminData>) => {
    if (!params.data) return null;

    const { id, name, surname } = params.data;

    return (
      <div className="m-0 flex h-10 items-center gap-1 p-0">
        <EditButton className="h-7 px-2 text-sm" href={`/admin/subscription/${id}`} />
      </div>
    );
  };

  // Colonne esposte in elenco.
  const columnsDefinition: ColDef<LearnerAdminData>[] = [
    { field: "id", headerName: "ID", width: 100 },
    { headerName: "Learner", valueFormatter: formatFullName },
    { headerName: "Pillole assegnate", valueFormatter: formatPillNumber },
    { headerName: "Pillole visionate", valueFormatter: () => "0" },
    { headerName: "Azioni", cellRenderer: renderActionsButton },
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
      />
    </div>
  );
};
