import type { DataTableSetup } from '~/types/datatable';

export function useDataTableSetup<T>(key: string, setup: DataTableSetup<T>) {
  const dataTableState = useDataTableState<T>(key);

  if (setup.filters) {
    dataTableState.value.filters = useDataTableFilters<T>(setup.filters);
  }
}
