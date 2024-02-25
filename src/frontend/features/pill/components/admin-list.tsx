/**
 * src/frontend/features/pill/components/admin-list.tsx
 *
 * Elenco delle pillole per admin
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import { defaultColumnsDefinition } from "@/frontend/lib/ag-grid";
import { apiClient } from "@/frontend/lib/trpc/client";
import { DeleteLink, EditLink } from "@/frontend/ui/buttons";
import { ErrorCard, LoadingBar } from "@/frontend/ui/status";
import { type PillAdminData } from "@/shared/features/pill/schema";
import { type ColDef, type GetRowIdFunc } from "@ag-grid-community/core";
import { AgGridReact, type CustomCellRendererProps } from "@ag-grid-community/react";
import React from "react";

// ------------------------------------------------------------------------------------------------

export const AdminPillList = (): React.JSX.Element => {
  // chiamate api.
  const pills = apiClient.adminPill.list.useQuery();
  const deletePill = apiClient.adminPill.delete.useMutation();
  const apiCache = apiClient.useUtils();

  if (pills.isLoading) return <LoadingBar />;
  if (pills.error) return <ErrorCard error={pills.error.message} />;

  // azione per i pulsanti "Elimina" presente in elenco.
  const handleDeletePill = (id: number, title: string) => {
    return () => {
      if (confirm(`Si è veramente sicuri di eliminare la pillola ${title}?`)) {
        deletePill
          .mutateAsync({ id })
          .then(() => {
            void apiCache.adminPill.invalidate();
          })
          .catch((err) => {
            console.error(err);
          });
      }
    };
  };

  // Cella con immagine di anteprima + titolo.
  const renderTitleAndThumb = (params: CustomCellRendererProps<PillAdminData>) => {
    if (!params.data) return null;

    const title = params.data.title;
    const thumbPath = params.data.thumbPath ? params.data.thumbPath : "/default-thumb.png";

    return (
      <div className="flex items-center justify-start gap-2">
        <img className="h-8 w-12 rounded-md" src={thumbPath} />
        <p>{title}</p>
      </div>
    );
  };

  // Cella con il numero di contenuti della pillola.
  const renderContentCount = (params: CustomCellRendererProps<PillAdminData>) => {
    if (!params.data) return null;

    return params.data.content.length;
  };

  // Cella con i pulsanti di modifica.
  const renderActionsButton = (params: CustomCellRendererProps<PillAdminData>) => {
    if (!params.data) return null;

    const { id, title } = params.data;

    return (
      <div className="m-0 flex h-10 items-center gap-1 p-0">
        <EditLink className="h-7 px-2 text-sm" href={`/admin/pill/${id}`} />
        <DeleteLink className="h-7 px-2 text-sm" onClick={handleDeletePill(id, title)} />
      </div>
    );
  };

  // Colonne esposte in elenco.
  const columnsDefinition: ColDef<PillAdminData>[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "id", headerName: "Titolo", cellRenderer: renderTitleAndThumb },
    { field: "id", headerName: "Contenuti", cellRenderer: renderContentCount },
    { field: "id", headerName: "Azioni", cellRenderer: renderActionsButton },
  ];

  const getRowId: GetRowIdFunc<PillAdminData> = (row) => `${row.data.id}`;

  return (
    <div className="ag-theme-quartz h-96 w-full">
      <AgGridReact
        rowData={pills.data}
        columnDefs={columnsDefinition}
        getRowId={getRowId}
        pagination={true}
        defaultColDef={defaultColumnsDefinition}
      />
    </div>
  );
};
