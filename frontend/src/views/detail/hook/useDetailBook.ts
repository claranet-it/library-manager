import { useEffect, useState } from 'react';
import { Book } from '../../../types';
import { HTTP } from '../../../utils/http-methods';

/**
 * Custom Hook to handle the detail of a book
 * @param {string} URL - The URL of the API
 * @param {number} id - The id of the book
 * @returns {Object} data - The data of the book
 * @returns {boolean} isError - Indicates if there is an error or not
 * @returns {boolean} isLoading - Indicates if the data is being loaded or not
 * @returns {Function} deleteBookById - Function to delete a book by its id
 */
export const useDetailBook = (URL: string, id: number) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<Book | null>(null);

  const tmpUrl = `${URL}/${id}`;

  const getBookById = async () => {
    setIsError(false);
    setIsLoading(true);
    try {
      const data = await HTTP.GET<Book>(tmpUrl);
      setData(data);
    } catch (error: any) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  const deleteBookById = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      await HTTP.DELETE(tmpUrl);
    } catch (error: any) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBookById();
  }, []);

  return {
    data,
    isError,
    isLoading,
    deleteBookById,
  };
};
