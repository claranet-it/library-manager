import React from 'react';
import { Book } from '../../../types';
import { BookCard } from './BookCard';

type Props = {
  books: Array<Book>;
};

export const BookList: React.FC<Props> = ({ books }) => {
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
