import { useState } from 'react';
import { Book } from '../../../types';
import { API } from '../../../utils/ApiClient';

// Error type
type IError = {
  isError: boolean;
  message: string;
};

/**
 * Custom hook to handle the edit of a book.
 * It allows to get the book by id, edit the book and navigate to the detail page of the book.
 *
 * @param {string} URL - Endpoint of the books api
 * @param {number} id - Id of the book to edit
 *
 * @returns {Object}
 * @property {Book} data - the book to edit
 * @property {boolean} isError - flag to check if there's an error
 * @property {boolean} isLoading - flag to check if the data is loading
 * @property {Function} editData - function to handle the edit of the book
 */
export const useEditBook = () => {
  // State hooks
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<IError>({ isError: false, message: '' });
  const [data, setData] = useState<Book>({} as Book);

  // Function to get the book by id
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

  // Function to edit the book
  const editData = async (id: string, body: Book) => {
    setIsLoading(true);
    setError((prev) => ({ ...prev, isError: false }));
    try {
      // Update the book
      await API.updateBook(id, body);
    } catch (error) {
      setError((prev) => ({ ...prev, isError: true, message: 'Error' }));
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
