import React from 'react';
import { Book } from '../../types';
import { BookCard } from './bookCard';

type Props = {
  books: Array<Book>;
};

const BookList: React.FC<Props> = ({ books }) => {
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
