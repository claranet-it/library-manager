import { useContext } from 'react';
import Pen from '../../../assets/icon/pen-solid.svg';
import Trash from '../../../assets/icon/trash-solid.svg';
import { Book, ModalContextType, OmitID } from '../../../model/types';
import { BookForm } from '../../../shared/components';
import { ModalSetState } from '../../../shared/context/modalContext';
import { ModalDelete } from './ModalDelete';

type Props = {
  book: Book;
  onDelete: () => void;
  onEdit: (values: OmitID<Book>) => Promise<void>;
};

export const BookDetail: React.FC<Props> = ({ book, onDelete, onEdit }) => {
  const { openModal, closeModal, setChildren } = useContext(ModalSetState) as ModalContextType;

  const handleModalDelete = () => {
    setChildren(
      <ModalDelete
        onConfirm={() => {
          onDelete();
          closeModal();
        }}
        onCancel={() => {
          closeModal();
        }}
      />
    );
    openModal();
  };

  const handleModalEdit = () => {
    setChildren(
      <BookForm
        onSubmit={onEdit}
        onCancel={() => {
          closeModal();
        }}
        values={book}
      />
    );
    openModal();
  };

  return (
    <div className="book">
      <div className="book__poster"></div>
      <div className="book__detail">
        <div className="book__actions">
          <button onClick={handleModalEdit}>
            <img className="edit" src={Pen} alt="back" height="20px" /> <div> Modifica</div>
          </button>
          <button onClick={handleModalDelete}>
            <img className="delete" src={Trash} alt="back" height="20px" />
            <div> Elimina</div>
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
