import {
  DataTableFilterOperation,
  type DataTableFilters,
} from '~/types/datatable';
import type { Entries } from '~/types/object';
import { isObject } from '~/utils/object';

export function useDataTableFiltersPredicate<T>(key: string): (item: T) => boolean {
  const state = useDataTableState<T>(key);

  const filters = computed<Entries<DataTableFilters<T>>>(() => (
    Object.entries(state.value.filters) as Entries<DataTableFilters<T>>
  ));

  return (item: T): boolean => (
    filters.value.every(([
      key,
      filter,
    ]) => {
      if (filter.value.length === 0) {
        return true;
      }

      const itemValue = isObject(item[key]) ? Object.keys(item[key]) : item[key];

      if (!itemValue) {
        return false;
      }

      if (Array.isArray(itemValue)) {
        if (filter.operation === DataTableFilterOperation.And) {
          return filter.value.every((value) => itemValue.includes(value));
        }

        return filter.value.some((value) => itemValue.includes(value));
      }

      if (filter.operation === DataTableFilterOperation.And) {
        return filter.value.every((value) => value === itemValue);
      }

      return filter.value.some((value) => value === itemValue);
    })
  );
}
