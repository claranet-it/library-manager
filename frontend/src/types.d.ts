export type Book = {
  id: number;
  title: string;
  author: string;
  description?: string;
  price: number;
};

export type ToastMessage = {
  type: string;
  title: string;
  message: string;
  id: string;
};

export type ToastContextType = {
  removeToast: (index: string) => void;
  addToast: (args: Omit<ToastMessage, 'id'>) => void;
};
