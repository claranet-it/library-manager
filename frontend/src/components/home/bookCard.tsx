import { Link } from 'react-router-dom';
import { BookCard as TBookCard } from '../../types';

export const BookCard: React.FC<TBookCard> = ({ book }) => {
  return (
    <Link to={`/detail/${book.id}`}>
      <div className="booklist__card">
        {/* <div className="booklist__card__title">{book.id}</div> */}
        <div className="booklist__card__title">{book.title}</div>
        <div className="booklist__card__author">{book.author}</div>
        <div className="booklist__card__description">{book.description}</div>
        <div className="booklist__card__price">{book.price}</div>
      </div>
    </Link>
  );
};
