export type Book = {
  id: string;
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
  addToast: (args: OmitID<ToastMessage>) => void;
};

export type ModalContextType = {
  openModal: () => void;
  closeModal: () => void;
  setChildren: (content: React.ReactNode) => void;
};

export type PaginatedData<T> = {
  data: T[];
  total: number;
  limit: number;
  offset: number;
};

export type TError = {
  isError: boolean;
  message: string;
};

export interface IHttpMethods {
  GET<T>(url: string, config?: RequestInit): Promise<T>;
  POST<T, U>(url: string, body: T, config?: RequestInit): Promise<U>;
  PUT<T, U>(url: string, body: T, config?: RequestInit): Promise<U>;
  DELETE<T>(url: string, config?: RequestInit): Promise<T>;
}

export type OmitID<T> = Omit<T, 'id'>;
