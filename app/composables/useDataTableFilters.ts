import {
  type DataTableFilterSetup,
  type DataTableFilter,
  DataTableFilterOperation,
} from '~/types/datatable';

export function useDataTableFilters<T>(setup: DataTableFilterSetup<T>): DataTableFilter<T>[] {
  const route = useRoute();

  const getQueryFilters = (): Record<string, unknown> => {
    try {
      return JSON.parse(route.query.filters as string || '{}');
    } catch {
      return {};
    }
  };

  const queryFilters = getQueryFilters();

  const getValue = (key: string, defaultValue?: string[]): string[] => {
    const value = queryFilters[key];

    if (typeof value !== 'string') {
      return defaultValue ?? [];
    }

    return value
      .split(value.includes(',') ? ',' : '+')
      .filter(Boolean);
  };

  const getOperation = (key: string, defaultOperation?: DataTableFilterOperation): DataTableFilterOperation => {
    const value = queryFilters[key];

    if (typeof value !== 'string') {
      return defaultOperation ?? DataTableFilterOperation.And;
    }

    return value.includes(',') ? DataTableFilterOperation.Or : DataTableFilterOperation.And;
  };

  const filters: DataTableFilter<T>[] = [];

  for (const key in setup) {
    const config = setup[key];

    if (!config) {
      continue;
    }

    filters.push({
      ...config,
      key,
      value: getValue(key, config.value),
      operation: getOperation(key, config.operation),
    });
  }

  return filters;
}
