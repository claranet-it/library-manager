import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BOOK } from '../../api/bookClient';
import Arrow from '../../assets/icon/arrow-left-solid.svg';
import { stockData } from '../../model/label';
import { STATUS } from '../../model/status';
import { Book, ModalContextType, OmitID, TError, ToastContextType } from '../../model/types';
import { ErrorMessage } from '../../shared/components/error';
import { Spinner } from '../../shared/components/spinner/Spinner';
import { ModalSetState } from '../../shared/context/modalContext';
import { ToastSetState } from '../../shared/context/toastContext';
import { BookDetail } from './components/BookDetail';

export const DetailPage: React.FC = (): React.ReactElement => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [book, setBook] = useState<Book | null>(null);
  const [error, setError] = useState<TError>({ isError: false, message: '' });
  const { addToast } = useContext(ToastSetState) as ToastContextType;
  const { closeModal } = useContext(ModalSetState) as ModalContextType;

  const { id = '' } = useParams();

  const handleEdit = async (body: OmitID<Book>): Promise<void> => {
    try {
      await BOOK.update({
        id,
        ...body,
      });
      addToast({
        type: STATUS.SUCCESS,
        title: stockData.toastMessage.titleSuccess,
        message: stockData.toastMessage.put,
      });
      getBook();
      closeModal();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : stockData.error;
      addToast({
        type: STATUS.ERROR,
        title: stockData.toastMessage.titleError,
        message,
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setIsLoading(true);
      await BOOK.delete(id);
      addToast({
        type: STATUS.SUCCESS,
        title: stockData.toastMessage.titleSuccess,
        message: stockData.toastMessage.delete,
      });
      navigate('/', { replace: true });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : stockData.error;
      addToast({
        type: STATUS.ERROR,
        title: stockData.toastMessage.titleError,
        message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getBook = async () => {
    try {
      setError((prev) => ({ ...prev, isError: false }));
      setIsLoading(true);

      const data = await BOOK.getById(id);
      setBook(data);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : stockData.error;
      setError((prev) => ({
        ...prev,
        isError: true,
        message,
      }));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBook();
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
