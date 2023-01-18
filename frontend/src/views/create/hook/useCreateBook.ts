import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiMethod } from '../../../utils/http-methods';

export const useCreateBook = (URL: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const sendData = async (body: any) => {
    setIsLoading(true);
    setIsError(false);

    try {
      await apiMethod.POST(URL, body);
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 1500);
    } catch (error) {
      setIsError(true);
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
