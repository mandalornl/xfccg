export enum FilterOperation {
  And = 'and',
  Or = 'or',
}

interface FilterBase<T> {
  key: keyof T;
  title: string;
  items: string[];
}

export interface Filter<T> extends FilterBase<T> {
  value: string[];
  operation: FilterOperation;
  multiple: boolean;
}

export interface FilterSetup<T> extends FilterBase<T> {
  value?: string[];
  operation?: FilterOperation;
  multiple?: boolean;
}

export type FilterableValue = string | string[] | Record<string, unknown>;
