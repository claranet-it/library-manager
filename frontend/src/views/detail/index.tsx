import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Arrow from '../../assets/icon/arrow-left-solid.svg';
import { BookDetail } from '../../components/detail/bookDetail';
import { Book } from '../../types';

export const Detail: React.FC = () => {
  const { id } = useParams();
  const [book, setBook] = useState<Book>();

  async function getBook(id: number) {
    try {
      const rawResponse = await fetch(`http://localhost:8080/api/books/${id}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const content = await rawResponse.json();
      setBook(content);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getBook(parseInt(id!));
  }, [id]);

  return (
    <div className="page detail">
      <div className="topbar detail__topbar">
        <Link to="/">
          <img src={Arrow} alt="back" width="30px" />
        </Link>
        <h1 className="page__title">Dettaglio libro</h1>
      </div>
      {book && <BookDetail book={book} />}
    </div>
  );
};
