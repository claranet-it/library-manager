import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Book } from '../../../types';
import { apiMethod } from '../../../utils/http-methods';

export const useEditBook = (URL: string, id: number) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<Book | null>(null);

  const navigate = useNavigate();
  const tmpUrl = `${URL}/${id}`;

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
