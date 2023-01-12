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
