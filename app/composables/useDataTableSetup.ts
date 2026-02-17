import {
  type DataTableSetup,
  DataTableView,
} from '~/types/datatable';

export function useDataTableSetup<T>(key: string, setup: DataTableSetup<T>) {
  const route = useRoute();
  const state = useDataTableState<T>(key);

  if (state.value.setup) {
    return;
  }

  const search = String(route.query.search || setup.search || '');

  if (search !== '') {
    state.value.search = search;
  }

  const view = String(route.query.view || setup.view || '');

  if (view === DataTableView.Grid || view === DataTableView.List) {
    state.value.view = view;
  }

  const page = Number(route.query.page || setup.page || 0);

  if (page > 0) {
    state.value.page = page;
  }

  const perPage = Number(route.query.perPage || setup.perPage || 0);

  if (perPage > 0) {
    state.value.perPage = perPage;
  }

  useDataTableSetupSortBys<T>(key, setup.sortBys);
  useDataTableSetupFilters<T>(key, setup.filters);

  state.value.setup = true;
}
