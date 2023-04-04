import { useContext } from 'react';
import Pen from '../../../assets/icon/pen-solid.svg';
import Trash from '../../../assets/icon/trash-solid.svg';
import { Book, OmitID } from '../../../model';
import { BookForm } from '../../../shared/components';
import { ModalState } from '../../../shared/context/modalContext';
import { ModalDelete } from './ModalDelete';

type Props = {
  book: Book;
  onDelete: () => void;
  onEdit: (values: OmitID<Book>) => Promise<void>;
};

export const BookDetail: React.FC<Props> = ({ book, onDelete, onEdit }) => {
  const { openModal, closeModal } = useContext(ModalState);

  const handleModalDelete = () => {
    openModal(
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
  };

  const handleModalEdit = () => {
    openModal(
      <BookForm
        onSubmit={onEdit}
        onCancel={() => {
          closeModal();
        }}
        values={book}
      />
    );
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
