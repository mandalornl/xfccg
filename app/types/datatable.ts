import type { SortBy } from '~/types/sort';

export interface DataTable<T> {
  search: string;
  page: number;
  perPage: number;
  sortBys: SortBy<T>[];
  filters: DataTableFilter<T>[];
}

export interface DataTableSetup<T> {
  search?: string;
  page?: number;
  perPage?: number;
  sortBys?: SortBy<T>[];
  filters?: DataTableFilterSetup<T>;
}

export enum DataTableFilterOperation {
  And = 'And',
  Or = 'Or',
}

export type DataTableFilterSetup<T> = {
  [K in keyof T]?: {
    title: string;
    items: string[];
    value?: string[];
    operation?: DataTableFilterOperation;
  };
}

export interface DataTableFilter<T> {
  key: keyof T;
  title: string;
  items: string[];
  value: string[];
  operation: DataTableFilterOperation;
}
