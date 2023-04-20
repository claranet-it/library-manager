import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BOOK } from '../../api/bookClient';
import Arrow from '../../assets/icon/arrow-left-solid.svg';
import { Book, OmitID, TError } from '../../model';
import { stockData } from '../../model/label';
import { STATUS } from '../../model/status';
import { ErrorMessage } from '../../shared/components/error/Error';
import { BookForm } from '../../shared/components/form/BookForm';
import { Spinner } from '../../shared/components/spinner/Spinner';
import { addToast } from '../../shared/components/toast/toastManager';

export const EditPage = () => {
  const navigate = useNavigate();

  const { id } = useParams() as { id: string }; // <== https://github.com/remix-run/react-router/issues/8498

  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<TError>({ isError: false, message: '' });

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
      navigate(`/detail/${id}`, { replace: true });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : stockData.error;
      addToast({
        type: STATUS.ERROR,
        title: stockData.toastMessage.titleError,
        message,
      });
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

  const handleCancel = () => {
    navigate(`/detail/${id}`, { replace: true });
  };

  if (isLoading) return <Spinner />;

  if (error.isError) return <ErrorMessage message={error.message} />;

  return (
    <div className="page create">
      <div className="topbar create__topbar">
        <Link to="/">
          <img src={Arrow} alt="back" width="30px" />
        </Link>
        <h1 className="page__title">Modifica libro</h1>
      </div>
      {book && <BookForm onSubmit={handleEdit} onCancel={handleCancel} values={book} />}
    </div>
  );
};
