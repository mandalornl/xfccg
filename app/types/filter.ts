export enum FilterOperation {
  And = 'and',
  Or = 'or',
}

export interface Filter<T> {
  key: keyof T;
  title: string;
  value: string[];
  items: string[];
  operation: FilterOperation;
}

export interface FilterConfig {
  title: string,
  items: string[],
  value?: string[],
  operation?: FilterOperation,
}

export type FilterSetup<T> = {
  [K in keyof T]?: FilterConfig
};

export type FilterableValue = string | string[] | Record<string, unknown>;