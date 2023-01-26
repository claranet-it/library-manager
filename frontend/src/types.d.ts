export type Book = {
  id: string;
  title: string;
  author: string;
  description?: string;
  price: number;
};

export type TData = {
  data: Book[];
  total: number;
  limit: number;
  offset: number;
};
