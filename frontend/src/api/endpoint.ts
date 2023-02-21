/**
ENDPOINTS is an object that contains all the endpoints used in the application.
@typedef {Object} ENDPOINTS
@property {string} BASEURL - Base url of the API
@property {string} BOOKS - Endpoint for books
*/
export const ENDPOINTS = {
  BASEURL: import.meta.env.VITE_BASE_URL,
  get BOOKS() {
    return this.BASEURL + `books`;
  },
};
