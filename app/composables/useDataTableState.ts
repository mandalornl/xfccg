import type { DataTable } from '~/types/datatable';

export function useDataTableState<T>(key: string): Ref<DataTable<T>> {
  return useState(`datatable:${key}`, () => ({
    search: '',
    page: 1,
    perPage: 10,
    sortBys: [],
    filters: [],
  }));
}
