import type { FilterOperation } from '~/utils/filter-operation';

export interface Filter {
  key: string;
  title: string;
  value: string[];
  items: string[];
  operation: FilterOperation;
}