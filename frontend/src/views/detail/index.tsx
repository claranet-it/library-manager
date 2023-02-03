import React, { useContext, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Arrow from '../../assets/icon/arrow-left-solid.svg';
import { BookDetail } from '../../components/detail/bookDetail';
import Spinner from '../../components/spinner';
import { ToastSetState } from '../../context/toastContext';
import { stockData } from '../../data';
import { STATUS } from '../../status';
import { ToastContextType } from '../../types';
import Error from '../error';
import { useDetailBook } from './hook/useDetailBook';

/**
 * Detail component is used to show and modify the detail of a book.
 * It uses the useDetailBook custom hook to fetch the data of the book, delete the book,
 * and the BookDetail component to display the information of the book.
 *
 * @returns {React.ReactElement} A react component that renders the detail of a book.
 *
 * @example
 * <Detail />
 */
export const Detail: React.FC = (): React.ReactElement => {
  const navigate = useNavigate();
  const { addToast } = useContext(ToastSetState) as ToastContextType;

  // Get the id from the url
  const { id } = useParams() as { id: string }; // <== https://github.com/remix-run/react-router/issues/8498

  const { data: book, error, isLoading, getBookById, deleteBookById } = useDetailBook();

  /**
   * handleEdit is used to navigate to the edit page of the book.
   */
  const handleEdit = () => {
    navigate(`/edit/${id}`, { replace: true });
  };

  /**
   * handleDelete is used to delete the book and navigate to the home page.
   * @async
   */
  const handleDelete = () => {
    deleteBookById(id)
      .then(() => {
        addToast({
          type: STATUS.SUCCESS,
          title: stockData.toastMessage.titleSuccess,
          message: stockData.toastMessage.delete,
        });
      })
      .catch((error) => {
        addToast({
          type: STATUS.ERROR,
          title: stockData.toastMessage.titleError,
          message: error.message,
        });
      });
    navigate('/', { replace: true });
  };

  // Fetch the book data when the component is mounted
  useEffect(() => {
    getBookById(id);
  }, [id]);

  if (isLoading) return <Spinner />;
  if (error.isError)
    return (
      <Error>
        <button onClick={() => navigate(-1)}>Go back home</button>
      </Error>
    );

  return (
    <div className="page detail">
      <div className="topbar detail__topbar">
        <Link to="/">
          <img src={Arrow} alt="back" width="30px" />
        </Link>
        <h1 className="page__title">Dettaglio libro</h1>
      </div>
      {book && <BookDetail book={book} onDelete={handleDelete} onEdit={handleEdit} />}
    </div>
  );
};
