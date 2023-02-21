import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BOOK } from '../../api/bookClient';
import Arrow from '../../assets/icon/arrow-left-solid.svg';
import { stockData } from '../../model/data';
import { STATUS } from '../../model/status';
import { ErrorMessage } from '../../shared/components/error/Error';
import { BookForm } from '../../shared/components/form/BookForm';
import { Spinner } from '../../shared/components/spinner/Spinner';
import { ToastSetState } from '../../shared/context/toastContext';
import { Book, OmitID, TError, ToastContextType } from '../../types';

export const EditPage = () => {
  const navigate = useNavigate();
  const { addToast } = useContext(ToastSetState) as ToastContextType;

  const { id } = useParams() as { id: string }; // <== https://github.com/remix-run/react-router/issues/8498

  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<TError>({ isError: false, message: '' });

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    BOOK.getById(id)
      .then((data) => {
        setBook(data);
        setIsLoading(false);
      })
      .catch((error: Error) => {
        setError({ isError: true, message: error.message });
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  const handleEdit = (body: OmitID<Book>) => {
    if (!id) return;
    BOOK.update({
      id,
      ...body,
    })
      .then(() => {
        addToast({
          type: STATUS.SUCCESS,
          title: stockData.toastMessage.titleSuccess,
          message: stockData.toastMessage.put,
        });
        navigate(`/detail/${id}`, { replace: true });
      })
      .catch((error) => {
        addToast({
          type: STATUS.ERROR,
          title: stockData.toastMessage.titleError,
          message: error.message,
        });
      });
  };

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
      {book && (
        <BookForm
          onSubmit={handleEdit}
          isLoading={isLoading}
          onCancel={handleCancel}
          values={book}
        />
      )}
    </div>
  );
};
