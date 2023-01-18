export const ENDPOINTS = {
  BASEURL: import.meta.env.VITE_BASE_URL,
  get BOOKS() {
    return this.BASEURL + `books`;
  },
};
