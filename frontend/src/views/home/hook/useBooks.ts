import { useState } from 'react';
import { IData } from '../../../types';
import { bookService } from '../../../utils/ServiceClass';

interface IError {
  isError: boolean;
  message: string;
}

/**
 * useBook is a custom React hook that fetches data from a given url.
 * It accepts three parameters:
 *   - url: the url to fetch the data from
 *   - offset: the starting point for fetching the data
 *   - limit: the number of data to fetch
 *
 * The hook returns an object that contains the following properties:
 *   - data: the data returned by the fetch request
 *   - isLoading: a boolean that indicates if the request is still loading
 *   - isError: a boolean that indicates if there was an error during the request
 *   - errorMessage: a string that contains the error message if isError is true
 *   - refetch: a function that can be called to refetch the data
 *
 * useBook will validate the offset and limit input, if the offset is less than 0 or not integer or limit is less than 0 or not integer it will return the error message "Invalid offset value" or "Invalid limit value" respectively and set isError to true.
 *
 * @param {string} url - the url to fetch the data from
 * @param {number} [offset] - the starting point for fetching the data
 * @param {number} [limit] - the number of data to fetch
 * @returns {object} - an object that contains the data, isLoading, isError, errorMessage and refetch properties
 *
 * @example
 *
 * const { data, isLoading, isError, errorMessage, refetch } = useBook('https://my-api.com/books', 0, 10);
 */
export const useBooks = () => {
  // State hooks
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<IError>({ isError: false, message: '' });
  const [data, setData] = useState<IData>({ data: [], total: 0, limit: 0, offset: 0 });

  /**
   * getBooks is a function that fetches data from a given url
   *
   * @param offset - the starting point for fetching the data
   * @param limit - the number of data to fetch
   */
  const getBooks = async (offset?: number, limit?: number) => {
    try {
      setError((prev) => ({ ...prev, isError: false }));
      setIsLoading(true);

      // Get the books
      const data = await bookService.getBooks(offset, limit);
      setData(data);
    } catch (error) {
      setError((prev) => ({ ...prev, isError: true, message: 'errore' }));
    }
    setIsLoading(false);
  };

  return {
    data,
    isLoading,
    error,
    getBooks,
  };
};
