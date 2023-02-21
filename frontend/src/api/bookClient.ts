import { Book, IHttpMethods, OmitID, PaginatedData } from '../model/types';
import { ENDPOINTS } from './endpoint';
import { httpMethods } from './httpMethods';

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
class BookClient {
  private API: IHttpMethods;
  private LIMIT: number;
  constructor() {
    this.API = httpMethods;
    this.LIMIT = import.meta.env.VITE_LIMIT;
  }

  /**
   * Makes a GET request to the specified url endpoint and returns a promise that resolves to the data object
   *
   * @async
   * @returns a promise that resolves to the data object
   */
  public async getAll(currentPage?: number): Promise<PaginatedData<Book>> {
    if (typeof currentPage == 'number') {
      const offset: number = currentPage * this.LIMIT;
      return await this.API.GET<PaginatedData<Book>>(
        `${ENDPOINTS.BOOKS}?offset=${offset}&limit=${this.LIMIT}`
      );
    }

    return await this.API.GET<PaginatedData<Book>>(`${ENDPOINTS.BOOKS}`);
  }

  /**
   * Makes a GET request to the specified url endpoint with the provided book id and returns a promise that resolves to the book object
   *
   * @async
   * @param {string} url - the url endpoint
   * @param {number} id - the id of the book
   * @returns a promise that resolves to the book object
   */
  public async getById(id: string): Promise<Book> {
    return await this.API.GET<Book>(`${ENDPOINTS.BOOKS}/${id}`);
  }

  /**
   * Makes a POST request to the specified url endpoint with the provided book data and returns a promise that resolves to the newly created book object
   *
   * @async
   * @param {Omit<Book, 'id'>} body - the body of the book
   * @returns a promise that resolves to the book object
   */
  public async create(body: OmitID<Book>): Promise<Book> {
    return await this.API.POST<OmitID<Book>, Book>(`${ENDPOINTS.BOOKS}`, body);
  }

  /**
   * Makes a PUT request to the specified url endpoint with the provided book data and returns a promise
   *
   * @async
   * @param {string} url - the url endpoint
   * @param {Book} body - the book data
   * @returns a promise that resolves to the updated book object
   */
  public async update(body: Book): Promise<Book> {
    return await this.API.PUT<Book, Book>(`${ENDPOINTS.BOOKS}/${body.id}`, body);
  }

  public async delete(id: string): Promise<void> {
    return await this.API.DELETE(`${ENDPOINTS.BOOKS}/${id}`);
  }
}

/*
 * Exporting the ApiClient instance
 */
export const BOOK = new BookClient();
