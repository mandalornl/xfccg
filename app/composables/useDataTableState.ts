import {
  type DataTable,
  type DataTableFilters,
  DataTableView,
} from '~/types/datatable';

export function useDataTableState<T>(key: string): Ref<DataTable<T>> {
  return useState(`datatable:${key}`, () => ({
    setup: false,
    search: '',
    view: DataTableView.Grid,
    page: 1,
    perPage: 10,
    sortBys: [],
    filters: {} as DataTableFilters<T>,
  }));
}
