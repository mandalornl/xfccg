import type { DataTableSetup } from '~/types/datatable';

export function useDataTable<T>(key: string, setup: DataTableSetup<T> = {}) {
  const dataTableState = useDataTableState<T>(key);

  useDataTableSetup<T>(key, setup);

  return {
    dataTableState,
  };
}
