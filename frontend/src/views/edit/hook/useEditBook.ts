import { useContext, useState } from 'react';
import { ToastSetState } from '../../../context/toastContext';
import { stockData } from '../../../data';
import { STATUS } from '../../../status';
import { Book, ToastContextType } from '../../../types';
import { API } from '../../../utils/ApiClient';

// Error type
type IError = {
  isError: boolean;
  message: string;
};

// Hook type
type TUseEditBook = {
  data: Book;
  error: IError;
  isLoading: boolean;
  getBookById: (id: string) => Promise<void>;
  editData: (body: Book) => Promise<void>;
};

/**
 * Custom hook to handle the edit of a book.
 * It allows to get the book by id, edit the book and navigate back to the detail page of the book.
 *
 * The hook returns an object that contains the following properties:
 *   - data: the data returned by the fetch request
 *   - isLoading: a boolean that indicates if the request is still loading
 *   - error: an object thant contains isError, a boolean that indicates if there was an error during the request, and message, a string that contains the error message if isError is true
 *   - getBookById: a function that fetches data from a given url
 *   - editData: a function that edits the book
 *
 */
export const useEditBook = (): TUseEditBook => {
  // State hooks
  const { addToast } = useContext(ToastSetState) as ToastContextType;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<IError>({ isError: false, message: '' });
  const [data, setData] = useState<Book>({} as Book);

  /**
   * Function to get the book by id
   * @param {string} id - The id of the book
   */
  const getBookById = async (id: string) => {
    try {
      setError((prev) => ({ ...prev, isError: false }));
      setIsLoading(true);

      // Get the book by id
      const data = await API.getBook(id);
      setData(data);
    } catch (error) {
      setError((prev) => ({ ...prev, isError: true, message: 'Book not found' }));
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Function to edit the book
   * @param {string} id - The id of the book
   * @param {Object} body - The body of the book to edit, it contains the new data of the book: id, title, author, description, price
   */
  const editData = async (body: Book) => {
    setIsLoading(true);
    setError((prev) => ({ ...prev, isError: false }));

    try {
      await API.updateBook(body);
      addToast({
        type: STATUS.SUCCESS,
        title: stockData.toastMessage.titleSuccess,
        message: stockData.toastMessage.put,
      });
    } catch (error) {
      setError((prev) => ({ ...prev, isError: true, message: 'Error' }));
      addToast({
        type: STATUS.ERROR,
        title: stockData.toastMessage.titleError,
        message: stockData.toastMessage.genericError,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    error,
    isLoading,
    getBookById,
    editData,
  };
};
