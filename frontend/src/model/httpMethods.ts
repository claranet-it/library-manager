export interface IHttpMethods {
  GET<T>(url: string, config?: RequestInit): Promise<T>;
  POST<T, U>(url: string, body: T, config?: RequestInit): Promise<U>;
  PUT<T, U>(url: string, body: T, config?: RequestInit): Promise<U>;
  DELETE<T>(url: string, config?: RequestInit): Promise<T>;
}
