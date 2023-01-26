import { useState } from 'react';
import { TData } from '../../../types';
import { bookService } from '../../../utils/ServiceClass';

// Error Type
type TError = {
  isError: boolean;
  message: string;
};

// Hook Type
type TUseBooks = {
  data: TData;
  error: TError;
  isLoading: boolean;
  getBooks: (offset: number, limit: number) => Promise<void>;
};

/**
 * useBook is a custom React hook that fetches data from a given url.

 * The hook returns an object that contains the following properties:
 *   - data: the data returned by the fetch request
 *   - isLoading: a boolean that indicates if the request is still loading
 *   - error: an object that contain isError, a boolean that indicates if there was an error during the request, and message, a string that contains the error message if isError is true
 *   - getBooks: a function that fetches data from a given url
 *
 */
export const useBooks = (): TUseBooks => {
  // State hooks
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<TError>({ isError: false, message: '' });
  const [data, setData] = useState<TData>({ data: [], total: 0, limit: 0, offset: 0 });

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
