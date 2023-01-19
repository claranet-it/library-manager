import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Arrow from '../../assets/icon/arrow-left-solid.svg';
import { BookDetail } from '../../components/detail/bookDetail';
import { ENDPOINTS } from '../../utils/endpoint';
import { useDetailBook } from './hook/useDetailBook';

// TODO: id 2 stringa

/**
 * Detail component is used to show and modify the detail of a book.
 * It uses the useDetailBook custom hook to fetch the data of the book,
 * and the BookDetail component to display the information of the book.
 */
export const Detail: React.FC = () => {
  const { id } = useParams();

  const {
    data: book,
    isError,
    isLoading,
    deleteBookById,
  } = useDetailBook(ENDPOINTS.BOOKS, parseInt(id!));

  return (
    <div className="page detail">
      <div className="topbar detail__topbar">
        <Link to="/">
          <img src={Arrow} alt="back" width="30px" />
        </Link>
        <h1 className="page__title">Dettaglio libro</h1>
      </div>
      {book && <BookDetail book={book} onDelete={deleteBookById} />}
    </div>
  );
};
