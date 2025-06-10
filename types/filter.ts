export type FilterOperation = 'and' | 'or';

export type Filter = {
  title: string,
  value: string[],
  items: string[],
  operation: FilterOperation,
};

export type Filters = {
  [filterType: string]: Filter,
};