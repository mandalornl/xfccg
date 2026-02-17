import type { SortBy } from '~/types/sort-by';

export function useDataTableSetupSortBys<T>(key: string, setup?: SortBy<T>[]) {
  const route = useRoute();
  const state = useDataTableState<T>(key);

  const getSortBys = (): SortBy<T>[] => {
    try {
      return JSON.parse(route.query.sortBys as string || '[]');
    } catch {
      return [];
    }
  };

  const sortBys = getSortBys();

  state.value.sortBys = sortBys.length > 0 ? sortBys : (setup ?? []);
}
