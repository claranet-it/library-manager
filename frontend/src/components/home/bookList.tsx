import React from 'react';
import { Book, BookList as TBookList } from '../../types';
import { BookCard } from './bookCard';

const BookList: React.FC<TBookList> = ({ books }) => {
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
