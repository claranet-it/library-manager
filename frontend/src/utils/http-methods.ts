/**
 * Class API
 *
 * This class provides an implementation of the IAPI interface. It allows you to perform CRUD operations on the server by using the fetch API.
 * Each method takes a url, and depending on the method, a body.
 * The methods return a promise that when resolved, will return the server response, which can be JSON parsed.
 * If there is a connection problem, the promise will be rejected with an error message.
 *
 */
class HttpMethods {
  private async HTTP<T>(url: string, config: RequestInit): Promise<T> {
    // Default headers
    let headers: any = {
      'Content-Type': 'application/json',
    };

    let newConfig = { ...config, headers };
    let request = new Request(url, { ...newConfig });

    // Make the request
    const response = await fetch(request);

    // Throw an error if the response is not ok
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('404: Not found');
      } else if (response.status === 500) {
        throw new Error('500: Internal server error');
      } else if (response.status === 400) {
        throw new Error('400: Bad request');
      } else {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
    }

    // Return the response as JSON, returns an empty object if there is no body
    return response.json().catch((e) => ({}));
  }

  public async GET<T>(url: string, config?: RequestInit): Promise<T> {
    const init = { method: 'get', ...config };
    return await this.HTTP<T>(url, init);
  }

  public async POST<T, U>(url: string, body: T, config?: RequestInit): Promise<U> {
    const init = { method: 'post', body: JSON.stringify(body), ...config };
    return await this.HTTP<U>(url, init);
  }

  public async PUT<T, U>(url: string, body: T, config?: RequestInit): Promise<U> {
    const init = { method: 'put', body: JSON.stringify(body), ...config };
    return await this.HTTP<U>(url, init);
  }

  public async DELETE<T>(url: string, config?: RequestInit): Promise<T> {
    const init = { method: 'delete', ...config };
    return await this.HTTP<T>(url, init);
  }
}

export const httpMethods = new HttpMethods();
