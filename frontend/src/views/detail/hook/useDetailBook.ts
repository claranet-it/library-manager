import { useState } from 'react';
import { stockData } from '../../../data';
import { Book } from '../../../types';
import { API } from '../../../utils/ApiClient';

// Error interface
interface IError {
  isError: boolean;
  message: string;
}

interface IUseDetailBook {
  data: Book | null;
  error: IError;
  isLoading: boolean;
  getBookById: (id: string) => Promise<void>;
  deleteBookById: (id: string) => Promise<void>;
}

/**
 * Custom Hook to handle the detail of a book
 * @param {string} URL - The URL of the API
 * @param {number} id - The id of the book
 * @returns {Object} data - The data of the book
 * @returns {Object} error - The error object
 * @returns {boolean} isError - Indicates if there is an error or not
 * @returns {string} message - The error message
 * @returns {boolean} isLoading - Indicates if the data is being loaded or not
 * @returns {Function} deleteBookById - Function to delete a book by its id
 */
export const useDetailBook = (): IUseDetailBook => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<IError>({ isError: false, message: '' });
  const [data, setData] = useState<Book | null>(null);

  /**
   * Get the book by its id
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
