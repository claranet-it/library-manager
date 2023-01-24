export type Book = {
  id: number;
  title: string;
  author: string;
  description?: string;
  price: number;
};

export type Book = {
  id: number;
  title: string;
  author: string;
  description?: string;
  price: number;
};

// TODO: Fix cleaning unused
export type BookList = {
  books: Array<Book>;
  isLoading: boolean;
  isError: boolean;
};

export type BookCard = {
  book: Book;
};

export interface IData {
  data: Book[];
  total: number;
  limit: number;
  offset: number;
}
