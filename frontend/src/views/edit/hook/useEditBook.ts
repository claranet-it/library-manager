import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Book } from '../../../types';
import { apiMethod } from '../../../utils/http-methods';

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

  // Router hook
  const navigate = useNavigate();
  const tmpUrl = `${URL}/${id}`;

  // Function to get the book by id
  const getBookById = async () => {
    try {
      setIsError(false);
      setIsLoading(true);
      const data = await apiMethod.GET(tmpUrl);
      setData(data);
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  // Function to edit the book
  const editData = async (body: any) => {
    setIsLoading(true);
    setIsError(false);
    // TODO: Aggiungi Toast (feedback)
    try {
      await apiMethod.PUT(tmpUrl, body);
      setTimeout(() => {
        navigate(`/detail/${id}`, { replace: true });
      }, 1500);
    } catch (error) {
      setIsError(true);
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
