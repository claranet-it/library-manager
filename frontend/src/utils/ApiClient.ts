import { Book, IData } from '../types';
import { ENDPOINTS } from './endpoint';
import { HttpMethods } from './http-methods';

/**
 * Class to handle the API calls
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
  public async getBooks(URL: string): Promise<IData> {
    return await this.GET<IData>(URL);
  }

  /**
   * Makes a GET request to the specified url endpoint with the provided book id and returns a promise that resolves to the book object
   *
   * @async
   * @param {string} url - the url endpoint
   * @param {number} id - the id of the book
   * @returns a promise that resolves to the book object
   */
  public async getBook(id: number): Promise<Book> {
    return await this.GET<Book>(`${ENDPOINTS.BOOKS}/${id}`);
  }

  /**
   * Makes a POST request to the specified url endpoint with the provided book data and returns a promise that resolves to the newly created book object
   *
   * @async
   * @param {string} url - the url endpoint
   * @param {Omit<Book, 'id'>} body - the body of the book
   * @returns a promise that resolves to the book object
   */
  public async createBook(url: string, body: Omit<Book, 'id'>): Promise<Book> {
    return await this.POST<Omit<Book, 'id'>, Book>(url, body);
  }

  /**
   * Makes a PUT request to the specified url endpoint with the provided book data and returns a promise
   *
   * @async
   * @param {string} url - the url endpoint
   * @param {Book} body - the book data
   * @returns a promise that resolves to the updated book object
   */
  public async updateBook(url: string, body: Book): Promise<Book> {
    return await this.PUT<Book, Book>(url, body);
  }

  public async deleteBook(id: number): Promise<void> {
    return await this.DELETE(`${ENDPOINTS.BOOKS}/${id}`);
  }
}

/*
 * Exporting the ApiClient instance
 */
export const API = new ApiClient();
