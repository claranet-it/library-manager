import { useContext, useEffect, useState } from 'react';
import { ToastSetState } from '../../../context/toastContext';
import { stockData } from '../../../data';
import { STATUS } from '../../../status';
import { Book, ToastContextType } from '../../../types';
import { HTTP } from '../../../utils/http-methods';

// Error interface
interface IError {
  isError: boolean;
  message: string;
}

interface IUseDetailBook {
  data: Book | null;
  error: IError;
  isLoading: boolean;
  deleteBookById: () => Promise<void>;
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
export const useDetailBook = (URL: string, id: number): IUseDetailBook => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<IError>({ isError: false, message: '' });
  const [data, setData] = useState<Book | null>(null);
  const { addToast } = useContext(ToastSetState) as ToastContextType;

  const tmpUrl = `${URL}/${id}`;

  /**
   * Get the book by its id
   */
  const getBookById = async () => {
    setError((prev) => ({ ...prev, isError: false }));
    // Set the error state
    setIsLoading(true);
    try {
      // Get the book
      const data = await HTTP.GET<Book>(tmpUrl);
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
  const deleteBookById = async () => {
    try {
      setIsLoading(true);
      setError((prev) => ({ ...prev, isError: false }));

      // Delete the book
      await HTTP.DELETE(tmpUrl);
      addToast({
        type: STATUS.SUCCESS,
        title: stockData.toastMessage.titleSuccess,
        message: stockData.toastMessage.delete,
      });
    } catch (error) {
      setError((prev) => ({
        ...prev,
        isError: true,
        message: stockData.errorBookNotFound,
      }));

      addToast({
        type: STATUS.ERROR,
        title: stockData.toastMessage.titleError,
        message: stockData.toastMessage.genericError,
      });
      // Throw the error if book can't be deleted
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Get the book by its id when the component is mounted
  useEffect(() => {
    getBookById();
  }, []);

  return {
    data,
    error,
    isLoading,
    deleteBookById,
  };
};
