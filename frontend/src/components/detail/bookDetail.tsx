import { Book } from '../../types';

type Props = {
  book: Book;
};

export const BookDetail: React.FC<Props> = ({ book }) => {
  return (
    <div className="book">
      <div className="book__poster"></div>
      <div className="book__detail">
        <div className="book__title">{book.title}</div>
        <div className="book__author">di {book.author}</div>
        <div className="book__label">Descrizione</div>
        <div className="book__description">{book.description}</div>
        <div className="book__label">Prezzo di vendita</div>
        <div className="book__price">{book.price} €</div>
      </div>
    </div>
  );
};
