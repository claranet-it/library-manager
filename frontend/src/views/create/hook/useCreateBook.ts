import { useState } from 'react';
import { Book } from '../../../types';
import { API } from '../../../utils/ApiClient';

// Error Type
type TError = {
  isError: boolean;
  message: string;
};

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
export const useCreateBook = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<TError>({ isError: false, message: '' });

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
