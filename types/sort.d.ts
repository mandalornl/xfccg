export interface SortBy {
  key: string;
  order: 'asc' | 'desc';
}

export interface Sortable {
  [sortKey: string]: string;
}