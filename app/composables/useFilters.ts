import type { Ref } from 'vue';

import type { Filter } from '~/types/filter';
import { FilterOperation as FilterOperationEnum } from '~/utils/filter-operation';

export const useFilters = (fields: Record<string, {
  title: string,
  items: string[],
  value?: string[],
  operation?: FilterOperationEnum,
}>): Ref<Filter[]> => {
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

  const getOperation = (key: string, defaultOperation?: FilterOperationEnum): FilterOperationEnum => {
    if (!route.query[key]) {
      return defaultOperation ?? FilterOperationEnum.AND;
    }

    const value = route.query[key] as string;

    return value.includes(',') ? FilterOperationEnum.OR : FilterOperationEnum.AND;
  };

  const filters = Object.entries(fields).map(([
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