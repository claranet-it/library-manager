import { useEffect, useState } from 'react';
import { apiMethod } from '../../../utils/http-methods';

export const useBook = (url: string, offset?: number, limit?: number) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState([]);

  const urlParams = new URLSearchParams();
  if (offset && limit) {
    url = `${url}?offset=${offset}?limit=${limit}`;
  }

  const getBooks = async () => {
    try {
      setIsError(false);
      setIsLoading(true);
      const data = await apiMethod.GET(url);
      setData(data);
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getBooks();
  }, [offset]);

  return {
    data,
    isLoading,
    isError,
    refetch: getBooks,
  };
};
