export type Book = {
  id: string;
  title: string;
  author: string;
  description?: string;
  price: number;
};

export type PaginatedData<T> = {
  data: T[];
  total: number;
  limit: number;
  offset: number;
};
