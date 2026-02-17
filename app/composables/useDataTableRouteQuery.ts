import {
  DataTableFilterOperation,
  type DataTableFilters,
  type DataTableSetup,
  DataTableView,
} from '~/types/datatable';
import type { Entries } from '~/types/object';

export function useDataTableRouteQuery<T>(key: string, setup: DataTableSetup<T>): () => {
  search?: string;
  view?: DataTableView;
  page?: number;
  perPage?: number;
  sortBys?: string;
  filters?: string;
} {
  const state = useDataTableState<T>(key);

  const getSortBys = (): string | undefined => {
    const sortBys = state.value.sortBys;

    if (sortBys.length === 0) {
      return undefined;
    }

    return JSON.stringify(sortBys);
  };

  const getFilters = (): string | undefined => {
    const filters = (Object.entries(state.value.filters) as Entries<DataTableFilters<T>>)
      .filter(([ , filter ]) => filter.value.length > 0)
      .map(([
        key,
        filter,
      ]) => ([
        key,
        filter.value.join(filter.operation === DataTableFilterOperation.And ? '+' : ','),
      ]));

    if (filters.length === 0) {
      return undefined;
    }

    return JSON.stringify(Object.fromEntries(filters));
  };

  return () => ({
    search: state.value.search || undefined,
    view: state.value.view !== (setup.view ?? DataTableView.Grid) ? state.value.view : undefined,
    page: state.value.page > 1 ? state.value.page : undefined,
    perPage: state.value.perPage !== (setup.perPage ?? 10) ? state.value.perPage : undefined,
    sortBys: getSortBys(),
    filters: getFilters(),
  });
}
