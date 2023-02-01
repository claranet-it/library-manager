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

export interface IHttpMethods {
  GET<T>(url: string, config?: RequestInit): Promise<T>;
  POST<T, U>(url: string, body: T, config?: RequestInit): Promise<U>;
  PUT<T, U>(url: string, body: T, config?: RequestInit): Promise<U>;
  DELETE<T>(url: string, config?: RequestInit): Promise<T>;
}
