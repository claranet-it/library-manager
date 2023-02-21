import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Arrow from '../../assets/icon/arrow-left-solid.svg';
import { ToastSetState } from '../../context/toastContext';
import { stockData } from '../../data';
import { ErrorMessage } from '../../shared/components/error/Error';
import Spinner from '../../shared/components/spinner';
import { STATUS } from '../../status';
import { Book, TError, ToastContextType } from '../../types';
import { API } from '../../utils/bookClient';
import { BookDetail } from './components/BookDetail';

export const Detail: React.FC = (): React.ReactElement => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [book, setBook] = useState<Book | null>(null);
  const [error, setError] = useState<TError>({ isError: false, message: '' });
  const { addToast } = useContext(ToastSetState) as ToastContextType;

  const { id = '' } = useParams();

  const handleEdit = () => {
    navigate(`/edit/${id}`, { replace: true });
  };

  const handleDelete = (id: string) => {
    if (!id) return;
    setIsLoading(true);
    API.deleteBook(id)
      .then(() => {
        addToast({
          type: STATUS.SUCCESS,
          title: stockData.toastMessage.titleSuccess,
          message: stockData.toastMessage.delete,
        });
        navigate('/', { replace: true });
      })
      .catch((error) => {
        addToast({
          type: STATUS.ERROR,
          title: stockData.toastMessage.titleError,
          message: error.message,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (!id) return;
    setError((prev) => ({ ...prev, isError: false }));
    setIsLoading(true);

    API.getBook(id)
      .then((data) => {
        setBook(data);
      })
      .catch((error) => {
        setError((prev) => ({
          ...prev,
          isError: true,
          message: error.message,
        }));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) return <Spinner />;

  if (error.isError) return <ErrorMessage message={error.message} />;

  return (
    <div className="page detail">
      <div className="topbar detail__topbar">
        <Link to="/">
          <img src={Arrow} alt="back" width="30px" />
        </Link>
        <h1 className="page__title">Dettaglio libro</h1>
      </div>
      {book && (
        <BookDetail book={book} onDelete={handleDelete.bind(this, id)} onEdit={handleEdit} />
      )}
    </div>
  );
};
