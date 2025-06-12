import type {
  SortBy,
  Sortable,
} from '~/types/sort';

export const sortCompare = (sortBy: SortBy[]) => {
  const collator = new Intl.Collator('en', {
    sensitivity: 'base',
    numeric: true,
  });

  return (sortableA: Sortable, sortableB: Sortable) => {
    for (const {
      key,
      order,
    } of sortBy) {
      const valueA = sortableA?.[key] ?? Number.MIN_SAFE_INTEGER;
      const valueB = sortableB?.[key] ?? Number.MIN_SAFE_INTEGER;

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
};