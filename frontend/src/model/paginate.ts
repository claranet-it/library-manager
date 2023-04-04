export type PaginatedData<T> = {
  data: T[];
  total: number;
  limit: number;
  offset: number;
};
