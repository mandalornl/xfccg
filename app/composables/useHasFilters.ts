import type { Ref } from 'vue';

import {
  type Filter,
  type FilterableValue,
  FilterOperation
} from '~/types/filter';
import { isObject } from '~/utils/object';

export function useHasFilters<T>(filters: Ref<Filter<T>[]>, item: T): boolean {
  return filters.value.every((filter) => {
    if (filter.value.length === 0) {
      return true;
    }

    let itemValue = item[filter.key as keyof T] as FilterableValue;

    if (!itemValue) {
      return false;
    }

    if (isObject(itemValue)) {
      itemValue = Object.keys(itemValue);
    }

    if (Array.isArray(itemValue)) {
      if (filter.operation === FilterOperation.Or) {
        return filter.value.some((value) => itemValue.includes(value));
      }

      return filter.value.every((value) => itemValue.includes(value));
    }

    return filter.value.includes(itemValue);
  })
}