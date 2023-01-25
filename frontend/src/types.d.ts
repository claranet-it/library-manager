export type Book = {
  id: number;
  title: string;
  author: string;
  description?: string;
  price: number;
};

export type ToastMessage = {
  message: string;
  id: number;
};
