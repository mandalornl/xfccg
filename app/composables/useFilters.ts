import type { Ref } from 'vue';

import type {
  Filter,
  FilterSetup,
} from '~/types/filter';
import { FilterOperation } from '~/utils/filter-operation';

export const useFilters = (setup: FilterSetup): Ref<Filter[]> => {
  const route = useRoute();

  const getValue = (key: string, defaultValue?: string[]): string[] => {
    if (!route.query[key]) {
      return defaultValue ?? [];
    }

    const value = route.query[key] as string;
    const or = value.includes(',');

    return value
      .split(or ? ',' : '+')
      .filter(Boolean);
  };

  const getOperation = (key: string, defaultOperation?: FilterOperation): FilterOperation => {
    if (!route.query[key]) {
      return defaultOperation ?? FilterOperation.AND;
    }

    const value = route.query[key] as string;

    return value.includes(',') ? FilterOperation.OR : FilterOperation.AND;
  };

  const filters = Object.entries(setup).map(([
    key,
    field,
  ]) => ({
    ...field,
    key,
    value: getValue(key, field.value),
    operation: getOperation(key, field.operation),
  }));

  return ref(filters);
};