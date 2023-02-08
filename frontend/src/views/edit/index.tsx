import { useContext, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Arrow from '../../assets/icon/arrow-left-solid.svg';
import { BookForm } from '../../components/form/bookForm';
import Spinner from '../../components/spinner';
import { ToastSetState } from '../../context/toastContext';
import { stockData } from '../../data';
import { STATUS } from '../../status';
import { Book, ToastContextType } from '../../types';
import { useEditBook } from './hook/useEditBook';

export const Edit = () => {
  const navigate = useNavigate();
  const { addToast } = useContext(ToastSetState) as ToastContextType;

  const { id } = useParams() as { id: string }; // <== https://github.com/remix-run/react-router/issues/8498

  const { data: book, error, isLoading, getBookById, editData } = useEditBook();

  const handleEdit = async (body: Omit<Book, 'id'>) => {
    await editData({ id, ...body })
      .then(() => {
        addToast({
          type: STATUS.SUCCESS,
          title: stockData.toastMessage.titleSuccess,
          message: stockData.toastMessage.put,
        });
        navigate(`/detail/${id}`, { replace: true });
      })
      .catch(() => {
        addToast({
          type: STATUS.ERROR,
          title: stockData.toastMessage.titleError,
          message: stockData.toastMessage.genericError,
        });
      });
  };

  const handleCancel = () => {
    navigate(`/detail/${id}`, { replace: true });
  };

  useEffect(() => {
    getBookById(id);
  }, [id]);

  if (isLoading) return <Spinner />;
  if (error.isError) return <div>Dati non caricati correttamente</div>;

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
