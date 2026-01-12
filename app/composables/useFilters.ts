import {
  type Filter,
  FilterOperation,
  type FilterSetup,
} from '~/types/filter';

export function useFilters<T>(setup: FilterSetup<T>[]) {
  const route = useRoute();

  const getRouteQueryValue = (key: string): string => route.query[key] as string || '';

  const getValue = (key: string, defaultValue?: string[]): string[] => {
    const value = getRouteQueryValue(key);

    if (!value) {
      return defaultValue ?? [];
    }

    const or = value.includes(',');

    return value
      .split(or ? ',' : '+')
      .filter(Boolean);
  };

  const getOperation = (key: string, defaultOperation?: FilterOperation): FilterOperation => {
    const value = getRouteQueryValue(key);

    if (!value) {
      return defaultOperation ?? FilterOperation.Or;
    }

    return value.includes(',') ? FilterOperation.Or : FilterOperation.And;
  };

  const filters = setup.map((config) => ({
    ...config,
    value: getValue(config.key as string, config.value),
    operation: getOperation(config.key as string, config.operation),
    multiple: config.multiple ?? false,
  }));

  return ref<Filter<T>[]>(filters);
}
