import { useState } from 'react';
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
    setIsLoading(true);
    try {
      const data = await API.getBook(id);
      setData(data);
    } catch (error) {
      setError((prev) => ({
        ...prev,
        isError: true,
        message: `Non è stato possibile recuperare i dati del libro. Riprova più tardi o contatta l'amministratore del sito.`,
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

      // Delete the book
      await API.deleteBook(id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`${error.name}: ${error.message}`);
      }
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
