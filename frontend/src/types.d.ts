export type Book = {
  id: number;
  title: string;
  author: string;
  description?: string;
  price: number;
};

export type BookList = {
  books: Array<Book>;
  isLoading: boolean;
  isError: boolean;
};

export type BookCard = {
  book: Book;
};
