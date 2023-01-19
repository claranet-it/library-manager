interface IAPI {
  GET(url: string): Promise<Response>;
  POST(url: string, body: unknown): Promise<Response>;
  PUT(url: string, body: unknown): Promise<Response>;
  DELETE(url: string): Promise<Response>;
}

/**
 * Class API
 *
 * This class provides an implementation of the IAPI interface. It allows you to perform CRUD operations on the server by using the fetch API.
 * Each method takes a url, and depending on the method, a body.
 * The methods return a promise that when resolved, will return the server response, which can be JSON parsed.
 * If there is a connection problem, the promise will be rejected with an error message.
 *
 * @example
 *  import { apiMethod } from './api';
 *
 *  apiMethod.GET('/books').then(data => console.log(data))
 *    .catch(error => console.log(error));
 *
 *  apiMethod.POST('/books', { title: 'bookTitle', author: 'authorName' }).then(data => console.log(data))
 *    .catch(error => console.log(error));
 *
 *  apiMethod.PUT('/books/bookId', { title: 'updatedTitle', author: 'updatedAuthor' }).then(data => console.log(data))
 *    .catch(error => console.log(error));
 *
 *  apiMethod.DELETE('/books/bookId').then(response => console.log(response))
 *    .catch(error => console.log(error));
 */
export class API implements IAPI {
  async GET(url: string) {
    try {
      const requestOptions = {
        method: 'GET',
        headers: {
          contentType: 'application/json',
        },
      };
      const response = await fetch(url, requestOptions);

      if (response.status >= 200 && response.status < 300) {
        return await response.json();
      } else {
        const error = await response.text();
        throw new Error(error);
      }
    } catch (err) {
      if (err instanceof TypeError) {
        throw new Error('There is a connection problem.');
      } else {
        throw err;
      }
    }
  }

  async POST(url: string, body: unknown) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.status >= 200 && res.status < 300) {
        const data = await res.json();
        return data;
      } else {
        const error = await res.text();
        throw new Error(error);
      }
    } catch (err) {
      if (err instanceof TypeError) {
        throw new Error('There is a connection problem.');
      } else {
        throw err;
      }
    }
  }

  async PUT(url: string, body: unknown) {
    try {
      const res = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.status >= 200 && res.status < 300) {
        const data = await res.json();
        return data;
      } else {
        const error = await res.text();
        throw new Error(error);
      }
    } catch (err) {
      if (err instanceof TypeError) {
        throw new Error('There is a connection problem.');
      } else {
        throw err;
      }
    }
  }

  async DELETE(url: string) {
    try {
      const requestOptions = {
        method: 'DELETE',
      };
      const res = await fetch(url, requestOptions);

      if (res.status >= 200 && res.status < 300) {
        return res;
      } else {
        const error = await res.text();
        throw new Error(error);
      }
    } catch (err) {
      if (err instanceof TypeError) {
        throw new Error('There is a connection problem.');
      } else {
        throw err;
      }
    }
  }
}

export const apiMethod = new API();
