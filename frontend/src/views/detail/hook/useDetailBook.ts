import { useState } from 'react';
import { stockData } from '../../../data';
import { Book } from '../../../types';
import { API } from '../../../utils/ApiClient';

// Error interface
type TError = {
  isError: boolean;
  message: string;
};

// Hook Type
type TUseDetailBook = {
  data: Book;
  error: TError;
  isLoading: boolean;
  getBookById: (id: string) => Promise<void>;
  deleteBookById: (id: string) => Promise<void>;
};

/**
 * Custom Hook to handle the detail of a book
 *
 * The hook returns an object that contains the following properties:
 *   - data: the data returned by the fetch request
 *   - isLoading: a boolean that indicates if the request is still loading
 *   - error: an object thant contains isError, a boolean that indicates if there was an error during the request, and message, a string that contains the error message if isError is true
 *   - getBookById: a function that fetches data from a given url
 *   - deleteBookById: a function that deletes the book
 *
 */
export const useDetailBook = (): TUseDetailBook => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<TError>({ isError: false, message: '' });
  const [data, setData] = useState<Book>({} as Book);

  /**
   * Get the book by its id
   *
   * @param {string} id - The id of the book
   */
  const getBookById = async (id: string) => {
    setError((prev) => ({ ...prev, isError: false }));
    // Set the error state
    setIsLoading(true);
    try {
      // Get the book
      const data = await API.getBook(id);
      setData(data);
    } catch (error) {
      // Set the error state if book doesn't exist
      setError((prev) => ({
        ...prev,
        isError: true,
        message: stockData.errorBookNotFound,
      }));
    }
    setIsLoading(false);
  };

  /**
   * Delete the book by its id
   *
   * @param {string} id - The id of the book
   */
  const deleteBookById = async (id: string) => {
    try {
      setIsLoading(true);
      setError((prev) => ({ ...prev, isError: false }));

      // Delete the book
      await API.deleteBook(id);
    } catch (error) {
      setError((prev) => ({
        ...prev,
        isError: true,
        message: stockData.errorBookNotFound,
      }));

      // Throw the error if book can't be deleted
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    error,
    isLoading,
    getBookById,
    deleteBookById,
  };
};
