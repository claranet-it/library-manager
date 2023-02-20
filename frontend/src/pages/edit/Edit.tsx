import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Arrow from '../../assets/icon/arrow-left-solid.svg';
import { ToastSetState } from '../../context/toastContext';
import { stockData } from '../../data';
import { Error } from '../../shared/components';
import { BookForm } from '../../shared/components/form/BookForm';
import Spinner from '../../shared/components/spinner';
import { STATUS } from '../../status';
import { Book, TError, ToastContextType } from '../../types';
import { API } from '../../utils/bookClient';

export const Edit = () => {
  const navigate = useNavigate();
  const { addToast } = useContext(ToastSetState) as ToastContextType;

  const { id } = useParams() as { id: string }; // <== https://github.com/remix-run/react-router/issues/8498

  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<TError>({ isError: false, message: '' });

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    API.getBook(id)
      .then((data) => {
        setBook(data);
        setIsLoading(false);
      })
      .catch((error: Error) => {
        setError({ isError: true, message: error.message });
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  const handleEdit = (body: Omit<Book, 'id'>) => {
    if (!id) return;
    API.updateBook({
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

  if (error.isError)
    return (
      <Error message={error.message}>
        <button onClick={() => navigate(-1)}>⬅️ Back</button>
      </Error>
    );

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
