import type { SortBy } from '~/types/sort';

export function useSort<T>(sortBy: SortBy<T>[]): (a: T, b: T) => number {
  const collator = new Intl.Collator('en', {
    sensitivity: 'base',
    numeric: true,
  });

  return (a: T, b: T) => {
    for (const {
      key,
      order,
    } of sortBy) {
      const valueA = String(a?.[key] ?? Number.MIN_SAFE_INTEGER);
      const valueB = String(b?.[key] ?? Number.MIN_SAFE_INTEGER);

      if (valueA === valueB) {
        continue;
      }

      if (order === 'desc') {
        return collator.compare(valueB, valueA);
      }

      return collator.compare(valueA, valueB);
    }

    return 0;
  };
}