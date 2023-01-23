import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Arrow from '../../assets/icon/arrow-left-solid.svg';
import { BookDetail } from '../../components/detail/bookDetail';
import Spinner from '../../components/spinner';
import { ENDPOINTS } from '../../utils/endpoint';
import { useDetailBook } from './hook/useDetailBook';

/**
 * Detail component is used to show and modify the detail of a book.
 * It uses the useDetailBook custom hook to fetch the data of the book,
 * and the BookDetail component to display the information of the book.
 */
export const Detail: React.FC = (): React.ReactElement => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: book,
    error,
    isLoading,
    deleteBookById,
  } = useDetailBook(ENDPOINTS.BOOKS, parseInt(id!));

  /**
   * handleEdit is used to navigate to the edit page of the book.
   */
  const handleEdit = () => {
    navigate(`/edit/${id}`, { replace: true });
  };

  /**
   * handleDelete is used to delete the book and navigate to the home page.
   */
  const handleDelete = async () => {
    await deleteBookById();
    navigate('/', { replace: true });
  };

  if (isLoading) return <Spinner />;
  if (error.isError) return <div>{error.message}</div>;

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