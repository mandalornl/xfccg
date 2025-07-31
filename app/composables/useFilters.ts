import {
  type Filter,
  type FilterSetup,
  type FilterConfig,
  FilterOperation,
} from '~/types/filter';

export function useFilters<T>(setup: FilterSetup<T>) {
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
      return defaultOperation ?? FilterOperation.And;
    }

    return value.includes(',') ? FilterOperation.Or : FilterOperation.And;
  };

  return ref<Filter<T>[]>(
    Object.entries(setup).map(([
      key,
      value,
    ]) => {
      const config = value as FilterConfig;

      return {
        ...config,
        key: key as keyof T,
        value: getValue(key, config.value),
        operation: getOperation(key, config.operation),
      };
    })
  );
}