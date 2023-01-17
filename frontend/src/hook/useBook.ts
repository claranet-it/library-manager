import { useEffect, useState } from 'react';
import { API } from '../utils/API';

export const useBook = (url: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState([]);

  const api = new API();

  const getBook = async () => {
    try {
      setIsError(false);
      setIsLoading(true);
      const data = await api.get(url);
      setData(data);
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getBook();
  }, []);

  return { data, isLoading, isError };
};
