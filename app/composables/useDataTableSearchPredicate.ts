import { isObject } from '~/utils/object';

export function useDataTableSearchPredicate<T>(key: string): (item: T, keys: (keyof T)[]) => boolean {
  const state = useDataTableState<T>(key);

  const normalize = (value: string): string => (
    value
      .normalize()
      .toLowerCase()
  );

  const getValue = (value: unknown): string => {
    if (isObject(value)) {
      return Object.values(value).join(' ');
    }

    if (Array.isArray(value)) {
      return value.join(' ');
    }

    if (typeof value !== 'string') {
      return '';
    }

    return value;
  }

  const search = computed<string>(() => normalize(state.value.search));

  return (item: T, keys: (keyof T)[]): boolean => {
    if (!search.value) {
      return true;
    }

    return keys.some((key) => {
      const value = getValue(item[key]);

      if (!value) {
        return false;
      }

      return normalize(value).indexOf(search.value) !== -1;
    });
  };
}
