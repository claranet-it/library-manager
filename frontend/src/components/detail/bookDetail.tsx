import Pen from '../../assets/icon/pen-solid.svg';
import Trash from '../../assets/icon/trash-solid.svg';
import { Book } from '../../types';
type Props = {
  book: Book;
};

export const BookDetail: React.FC<Props> = ({ book }) => {
  const handleDelete = async (id: number) => {
    console.log('#### cancello', id);
    try {
      const requestOptions = {
        method: 'DELETE',
        headers: {
          contentType: 'application/json',
          'Access-Control-Allow-Methods': 'DELETE',
        },
      };
      const res = await fetch(`http://localhost:8080/api/books?=${id}`, requestOptions);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id: number) => {
    console.log('#### modifico', id);
  };

  return (
    <div className="book">
      <div className="book__poster"></div>
      <div className="book__detail">
        <div className="book__actions">
          <button
            onClick={() => {
              handleEdit(book.id);
            }}
          >
            <img className="edit" src={Pen} alt="back" height="20px" /> Modifica
          </button>
          <button onClick={() => handleDelete(book.id)}>
            <img className="delete" src={Trash} alt="back" height="20px" />
            Elimina
          </button>
        </div>
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
