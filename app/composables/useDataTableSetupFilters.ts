import {
  DataTableFilterOperation,
  type DataTableSetupFilter,
  type DataTableFilters,
} from '~/types/datatable';

export function useDataTableSetupFilters<T>(key: string, setup?: DataTableSetupFilter<T>[]) {
  if (!setup) {
    return;
  }

  const route = useRoute();
  const state = useDataTableState<T>(key);

  const getFilters = (): Record<string, unknown> => {
    try {
      return JSON.parse(route.query.filters as string || '{}');
    } catch {
      return {};
    }
  };

  const getValue = (key: string, defaultValue?: string[]): string[] => {
    const value = filters[key];

    if (typeof value !== 'string') {
      return defaultValue ?? [];
    }

    return value
      .split(value.includes('+') ? '+' : ',')
      .filter(Boolean);
  };

  const getOperation = (key: string, defaultOperation?: DataTableFilterOperation): DataTableFilterOperation => {
    const value = filters[key];

    if (typeof value !== 'string') {
      return defaultOperation ?? DataTableFilterOperation.Or;
    }

    return value.includes('+')
      ? DataTableFilterOperation.And
      : DataTableFilterOperation.Or;
  };

  const filters = getFilters();

  state.value.filters = Object.fromEntries(
    setup.map((config) => ([
      config.key,
      {
        value: getValue(config.key as string, config.value),
        operation: getOperation(config.key as string, config.operation),
      },
    ]))
  ) as DataTableFilters<T>;
}
