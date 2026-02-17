import type { SortBy } from '~/types/sort-by';

export enum DataTableView {
  Grid = 'grid',
  List = 'list',
}

export enum DataTableFilterOperation {
  And = 'And',
  Or = 'Or',
}

export type DataTableFilters<T> = {
  [key in keyof T]: {
    value: string[];
    operation: DataTableFilterOperation;
  };
};

export interface DataTableFilter<T> {
  key: keyof T;
  title: string;
  items: string[];
  value?: string[];
  operation?: DataTableFilterOperation;
  multiple?: boolean;
}

export type DataTableSetupFilter<T> = Pick<DataTableFilter<T>, 'key' | 'value' | 'operation'>;

export interface DataTable<T> {
  setup: boolean,
  search: string;
  view: DataTableView;
  page: number;
  perPage: number;
  sortBys: SortBy<T>[];
  filters: DataTableFilters<T>;
}

export interface DataTableSetup<T> {
  search?: string;
  view?: DataTableView;
  page?: number;
  perPage?: number;
  sortBys?: SortBy<T>[];
  filters?: DataTableSetupFilter<T>[];
}
