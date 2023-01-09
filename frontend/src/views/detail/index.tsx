import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Arrow from '../../assets/icon/arrow-left-solid.svg';
import { BookCard } from '../../components/home/bookCard';
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
      console.log('##### raw response', rawResponse);
      const content = await rawResponse.json();
      console.log('##### content', content);
      setBook(content);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getBook(parseInt(id!));
  }, [id]);

  console.log('### book', book);
  return (
    <div className="page create">
      <div className="topbar create__topbar">
        <Link to="/">
          <img src={Arrow} alt="back" width="30px" />
        </Link>
        <h1 className="page__title">Dettaglio libro</h1>
      </div>
      {book && <BookCard book={book!} />}
    </div>
  );
};
