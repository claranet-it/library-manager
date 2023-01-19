import { useEffect, useState } from 'react';
import { Book } from '../../../types';
import { apiMethod } from '../../../utils/http-methods';

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

// TODO: better name for this interface
interface IData {
  data: Book[];
  total: number;
  limit: number;
  offset: number;
}

export const useBook = (url: string, offset?: number, limit?: number) => {
  // State hooks
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [data, setData] = useState<IData>({ data: [], total: 0, limit: 0, offset: 0 });
  const [errorMessage, setErrorMessage] = useState<string>('');

  //validate offset and limit before use them
  // Becareful: refetch could be undefined, so, inside the page in wich you are using this custom hook, use refetch with in an if state
  if (offset && (offset < 0 || !Number.isInteger(offset))) {
    setErrorMessage('Invalid offset value');
    setIsError(true);
    return {
      data,
      isLoading,
      isError,
      errorMessage,
    };
  }
  if (limit && (limit < 0 || !Number.isInteger(limit))) {
    setErrorMessage('Invalid limit value');
    setIsError(true);
    return {
      data,
      isLoading,
      isError,
      errorMessage,
    };
  }

  // Append offset and limit property to the url if these property exist
  if (offset != undefined && limit != undefined) {
    url = `${url}?offset=${offset}&limit=${limit}`;
  }

  // Function to get all the books
  const getBooks = async () => {
    try {
      setIsError(false);
      setIsLoading(true);
      const data = await apiMethod.GET(url);
      setData(data);
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  // Get all the book at the first render and every time offset changes
  useEffect(() => {
    getBooks();
  }, [offset, url]);

  return {
    data,
    isLoading,
    isError,
    errorMessage,
    refetch: getBooks,
  };
};
