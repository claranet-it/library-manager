import React from 'react';
import { stockData } from '../../data';
import { Book } from '../../types';
import Spinner from '../spinner';
import { BookCard } from './bookCard';

interface IBook {
  author: string;
  description: string;
  id: 20;
  price: number;
  title: string;
}
interface IBookList {
  books: Array<IBook>;
  isLoading: boolean;
  isError: boolean;
}

const BookList: React.FC<IBookList> = ({ books, isLoading, isError }) => {
  if (isLoading) return <Spinner />;
  if (isError) return <div className="info">{stockData.loadError}</div>;

  // TODO: Inserire questo componente. Valutare il cambio di architettura e portare tutto sulla pagina.
  // return <div className="info">{stockData.errorNoBooks}</div>
  return (
    <React.Fragment>
      <div className="booklist">
        {books?.map((book: Book) => (
          <BookCard book={book} key={book.id} />
        ))}
      </div>
    </React.Fragment>
  );
};

export default BookList;
/* function getFetch(arg0: string) {
  throw new Error('Function not implemented.');
}*/
