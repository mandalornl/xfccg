import type { DataTableSetup } from '~/types/datatable';

export function useDataTable<T>(key: string, setup: DataTableSetup<T>) {
  useDataTableSetup<T>(key, setup);

  const dataTable = useDataTableState<T>(key);
  const searchPredicate = useDataTableSearchPredicate<T>(key);
  const filtersPredicate = useDataTableFiltersPredicate<T>(key);
  const getRouteQuery = useDataTableRouteQuery<T>(key, setup);

  watch([
    () => dataTable.value.search,
    () => dataTable.value.filters,
  ], () => {
    dataTable.value.page = 1;
  }, {
    deep: true,
  });

  return {
    dataTable,
    searchPredicate,
    filtersPredicate,
    getRouteQuery,
  };
}
