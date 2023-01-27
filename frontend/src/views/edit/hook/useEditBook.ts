import { useContext, useEffect, useState } from 'react';
import { ToastContext } from '../../../context/toastContext';
import { stockData } from '../../../data';
import { STATUS } from '../../../status';
import { Book, ToastContextType } from '../../../types';
import { HTTP } from '../../../utils/http-methods';

/**
 * Custom hook to handle the edit of a book.
 * It allows to get the book by id, edit the book and navigate to the detail page of the book.
 *
 * @param {string} URL - Endpoint of the books api
 * @param {number} id - Id of the book to edit
 *
 * @returns {Object}
 * @property {Book | null} data - the book to edit
 * @property {boolean} isError - flag to check if there's an error
 * @property {boolean} isLoading - flag to check if the data is loading
 * @property {Function} editData - function to handle the edit of the book
 */
export const useEditBook = (URL: string, id: number) => {
  // State hooks
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<Book | null>(null);
  const { addToast } = useContext(ToastContext) as ToastContextType;

  // Router hook
  const tmpUrl = `${URL}/${id}`;

  // Function to get the book by id
  const getBookById = async () => {
    try {
      setIsError(false);
      setIsLoading(true);
      const data = await HTTP.GET<Book>(tmpUrl);
      setData(data);
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  // Function to edit the book
  const editData = async (body: Book) => {
    setIsLoading(true);
    setIsError(false);
    // TODO: Aggiungi Toast (feedback)

    try {
      await HTTP.PUT<Book, Book>(tmpUrl, body);
      addToast({
        type: STATUS.SUCCESS,
        title: stockData.toastMessage.titleSuccess,
        message: stockData.toastMessage.put,
      });
    } catch (error) {
      setIsError(true);
      addToast({
        type: STATUS.ERROR,
        title: stockData.toastMessage.titleError,
        message: stockData.toastMessage.genericError,
      });
    }
  };

  // Get data at the first render
  useEffect(() => {
    getBookById();
  }, []);

  return {
    data,
    isError,
    isLoading,
    editData,
  };
};
