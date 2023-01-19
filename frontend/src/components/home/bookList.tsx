import React from 'react';
import { stockData } from '../../data';
import { Book, BookList as TBookList } from '../../types';
import Spinner from '../spinner';
import { BookCard } from './bookCard';

const BookList: React.FC<TBookList> = ({ books, isLoading, isError }) => {
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
