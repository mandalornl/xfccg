import type { FilterOperation } from '~/utils/filter-operation';

export interface Filter {
  key: string;
  title: string;
  value: string[];
  items: string[];
  operation: FilterOperation;
}

export interface Filterable {
  [filterKey: string]: string | string[];
}

export type FilterSetup = Record<string, {
  title: string,
  items: string[],
  value?: string[],
  operation?: FilterOperation,
}>;