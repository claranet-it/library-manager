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

export class API {
  async GET(url: string) {
    const requestOptions = {
      method: 'GET',
      headers: {
        contentType: 'application/json',
      },
    };
    const response = await fetch(url, requestOptions);
    return await response.json();
  }

  async POST(url: string, body) {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();

    return data;
  }

  async PUT(url: string, body) {
    const res = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();

    return data;
  }

  async DELETE(url: string) {}
}

export const apiMethod = new API();
