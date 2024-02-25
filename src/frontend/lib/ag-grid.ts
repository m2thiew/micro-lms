/**
 * src/frontend/lib/ag-grid/modules.ts
 *
 * Configura i moduli utilizzati da AgGrid
 * https://www.ag-grid.com/react-data-grid/modules/#registering-ag-grid-modules
 *
 * @author  Matteo Marcoli <matteo.marcoli@studenti.unimi.it>
 * @company Università degli studi di Milano
 * @project micro-lms
 */

import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry, type ColDef, type GridOptions } from "@ag-grid-community/core";

// ------------------------------------------------------------------------------------------------

/**
 * Registra i moduli di AgGrid. È necessario chiamare questa funzione prima dell'utilizzo di AgGrid.
 */

export const registerAgGridModules = (): void => {
  ModuleRegistry.registerModules([ClientSideRowModelModule]);
};

// ------------------------------------------------------------------------------------------------

/**
 * Impostazioni di default per le colonne degli elenchi AgGrid.
 */
export const defaultColumnsDefinition: ColDef = { filter: true };
export const defaultGridOptions: GridOptions = { autoSizeStrategy: { type: "fitGridWidth" } };

// ------------------------------------------------------------------------------------------------
