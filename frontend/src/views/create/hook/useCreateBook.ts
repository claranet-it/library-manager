import { useContext, useState } from 'react';
import { ToastContext } from '../../../context/toastContext';
import { stockData } from '../../../data';
import { STATUS } from '../../../status';
import { Book, ToastContextType } from '../../../types';
import { HTTP } from '../../../utils/http-methods';

/**
 * This hook handles the process of creating a new book by sending a POST request to the specified URL.
 * It also manages the loading and error state of the request, and navigates to the home page once the request is successful.
 *
 * @function useCreateBook
 * @param {string} URL - The URL of the API
 * @returns {boolean} isError - boolean
 * @returns {boolean} isLoading - Indicates if the data is being loaded or not
 * @returns {Function} sendData - Function to create new book
 *
 */
export const useCreateBook = (URL: string) => {
  const { addToast } = useContext(ToastContext) as ToastContextType;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const sendData = async (body: Omit<Book, 'id'>) => {
    setIsLoading(true);
    setIsError(false);

    try {
      await HTTP.POST<Omit<Book, 'id'>, Book>(URL, body);
      addToast({
        type: STATUS.SUCCESS,
        title: stockData.toastMessage.titleSuccess,
        message: stockData.toastMessage.add,
      });
    } catch (error: any) {
      setIsError(true);
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
    isError,
    isLoading,
    sendData,
  };
};
