import { Book, IHttpMethods, OmitID, PaginatedData } from '../model/types';
import { ENDPOINTS } from './endpoint';
import { httpMethods } from './httpMethods';

class BookClient {
  private API: IHttpMethods;

  constructor(o: IHttpMethods) {
    this.API = o;
  }

  public async getAll(currentPage: number): Promise<PaginatedData<Book>> {
    const LIMIT = import.meta.env.VITE_LIMIT;
    const offset: number = currentPage * LIMIT;
    return await this.API.GET<PaginatedData<Book>>(
      `${ENDPOINTS.BOOKS}?offset=${offset}&limit=${LIMIT}`
    );
  }

  public async getById(id: string): Promise<Book> {
    return await this.API.GET<Book>(`${ENDPOINTS.BOOKS}/${id}`);
  }

  public async create(body: OmitID<Book>): Promise<Book> {
    return await this.API.POST<OmitID<Book>, Book>(`${ENDPOINTS.BOOKS}`, body);
  }

  public async update(body: Book): Promise<Book> {
    return await this.API.PUT<Book, Book>(`${ENDPOINTS.BOOKS}/${body.id}`, body);
  }

  public async delete(id: string): Promise<void> {
    return await this.API.DELETE(`${ENDPOINTS.BOOKS}/${id}`);
  }
}

export const BOOK = new BookClient(httpMethods);
