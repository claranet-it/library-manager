import { Book, PaginatedData } from '../types';
import { ApiClient } from './ApiClient';
import { ENDPOINTS } from './endpoint';

/**
 * This class is used to handle the API calls for books.
 * This class is a service class that is used to handle the business logic of the application.
 * It's using the ApiClient class to make the actual calls and it provides a higher level of abstraction and better organization of code.
 * It also allows to have a separation of concerns between the business logic and the data layer.
 *
 * @class ApiClientService
 */
export class ApiClientService {
  private apiClient: ApiClient;
  private url: string;

  /**
   * @constructor
   * @param {ApiClient} apiClient - an instance of ApiClient class
   */
  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
    this.url = ENDPOINTS.BOOKS;
  }

  /**
   * This method is used to get all the books
   * @async
   * @param {number} [offset] - the offset of the books
   * @param {number} [limit] - the limit of the books
   * @returns {Promise<PaginatedData<Book>>} - a promise that resolves to the data object
   */
  public async getBooks(offset?: number, limit?: number): Promise<PaginatedData<Book>> {
    if (offset && limit)
      return await this.apiClient.getBooks(`${this.url}?offset=${offset}&limit=${limit}`);

    return await this.apiClient.getBooks(this.url);
  }
}

export const bookService = new ApiClientService(new ApiClient());
