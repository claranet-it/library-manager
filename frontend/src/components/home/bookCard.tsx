import { Book } from '../../types';

type Props = {
  book: Book;
};

export const BookCard: React.FC<Props> = ({ book }) => {
  return (
    <div className="booklist__card">
      {/* <div className="booklist__card__title">{book.id}</div> */}
      <div className="booklist__card__title">{book.title}</div>
      <div className="booklist__card__author">{book.author}</div>
      <div className="booklist__card__description">{book.description}</div>
      <div className="booklist__card__price">{book.price}</div>
    </div>
  );
};
