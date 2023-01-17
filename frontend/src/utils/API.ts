export const api = {
  getFetch: (url: string) => {
    const requestOptions = {
      method: 'GET',
      headers: {
        contentType: 'application/json',
      },
    };
    return fetch(url, requestOptions);
  },

  postFetch: (url: string, body: string) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: body,
    };
    return fetch(url, requestOptions);
  },
};

export const ENDPOINTS = {
  BASEURL: `http://localhost:8080/api/`,
  get BOOKS() {
    return this.BASEURL + `books`;
  },
};

export class API {
  async get(url: string) {
    const requestOptions = {
      method: 'GET',
      headers: {
        contentType: 'application/json',
      },
    };
    const response = await fetch(url, requestOptions);
    return await response.json();
  }

  async post(url: string, body) {}

  async put(url: string, body) {}

  async delete(url: string) {}
}
