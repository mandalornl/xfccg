type SortOrder = 'asc' | 'desc';

export interface SortBy<T> {
  key: keyof T;
  order: SortOrder;
}