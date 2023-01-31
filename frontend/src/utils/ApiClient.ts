import { Book, PaginatedData } from '../types';
import { ENDPOINTS } from './endpoint';
import { HttpMethods } from './http-methods';

/**
 * Class to handle the API calls. Extends the HttpMethods class.
 * @class ApiClient
 * @extends HttpMethods
 * @property {Function} getBooks - Function to get all the books
 * @property {Function} getBook - Function to get a book by id
 * @property {Function} updateBook - Function to update a book
 * @property {Function} deleteBook - Function to delete a book
 * @property {Function} createBook - Function to create a book
 *
 */
export class ApiClient extends HttpMethods {
  constructor() {
    super();
  }
  /**
   * Makes a GET request to the specified url endpoint and returns a promise that resolves to the data object
   *
   * @async
   * @returns a promise that resolves to the data object
   */
  public async getBooks(URL: string): Promise<PaginatedData<Book>> {
    return await this.GET<PaginatedData<Book>>(URL);
  }

  /**
   * Makes a GET request to the specified url endpoint with the provided book id and returns a promise that resolves to the book object
   *
   * @async
   * @param {string} url - the url endpoint
   * @param {number} id - the id of the book
   * @returns a promise that resolves to the book object
   */
  public async getBook(id: string): Promise<Book> {
    return await this.GET<Book>(`${ENDPOINTS.BOOKS}/${id}`);
  }

  /**
   * Makes a POST request to the specified url endpoint with the provided book data and returns a promise that resolves to the newly created book object
   *
   * @async
   * @param {Omit<Book, 'id'>} body - the body of the book
   * @returns a promise that resolves to the book object
   */
  public async createBook(body: Omit<Book, 'id'>): Promise<Book> {
    return await this.POST<Omit<Book, 'id'>, Book>(ENDPOINTS.BOOKS, body);
  }

  /**
   * Makes a PUT request to the specified url endpoint with the provided book data and returns a promise
   *
   * @async
   * @param {string} url - the url endpoint
   * @param {Book} body - the book data
   * @returns a promise that resolves to the updated book object
   */
  public async updateBook(id: string, body: Book): Promise<Book> {
    return await this.PUT<Book, Book>(`${ENDPOINTS.BOOKS}/${id}`, body);
  }

  public async deleteBook(id: string): Promise<void> {
    return await this.DELETE(`${ENDPOINTS.BOOKS}/${id}`);
  }
}

/*
 * Exporting the ApiClient instance
 */
export const API = new ApiClient();
