import { useState } from 'react';
import { Book } from '../../../types';
import { API } from '../../../utils/ApiClient';

// Error Type
type TError = {
  isError: boolean;
  message: string;
};

// Hook Type
type TUseCreateBook = {
  error: TError;
  isLoading: boolean;
  sendData: (body: Omit<Book, 'id'>) => Promise<void>;
};

/**
 * This hook handles the process of creating a new book by sending a POST request to the specified URL.
 * It also manages the loading and error state of the request.
 *
 * The hook returns an object that contains the following properties:
 *   - isLoading: a boolean that indicates if the request is still loading
 *   - error: an object thant contains isError, a boolean that indicates if there was an error during the request, and message, a string that contains the error message if isError is true
 *   - sendData: a function that sends the data to the API
 *
 */
export const useCreateBook = (): TUseCreateBook => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<TError>({ isError: false, message: '' });

  /**
   * Send the data to the API
   * @param {Object} body - The body of the request that contains the data of the book, but not the id
   *
   */
  const sendData = async (body: Omit<Book, 'id'>) => {
    setIsLoading(true);
    setError((prev) => ({ ...prev, isError: false }));

    try {
      // Create the book
      await API.createBook(body);
    } catch (error) {
      console.log(error);
      setError((prev) => ({ ...prev, isError: true, message: 'Error: Something went wrong.' }));

      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    error,
    isLoading,
    sendData,
  };
};
