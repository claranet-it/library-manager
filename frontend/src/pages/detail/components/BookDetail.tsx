import { useContext } from 'react';
import Pen from '../../../assets/icon/pen-solid.svg';
import Trash from '../../../assets/icon/trash-solid.svg';
import { Book, ModalContextType } from '../../../model/types';
import { ModalSetState } from '../../../shared/context/modalContext';
import { ModalDelete } from './ModalDelete';

type Props = {
  book: Book;
  onDelete: () => void;
  onEdit: () => void;
};

export const BookDetail: React.FC<Props> = ({ book, onDelete, onEdit }) => {
  const { openModal, closeModal, setChildren } = useContext(ModalSetState) as ModalContextType;

  const handleModal = () => {
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

  return (
    <div className="book">
      <div className="book__poster"></div>
      <div className="book__detail">
        <div className="book__actions">
          <button onClick={onEdit}>
            <img className="edit" src={Pen} alt="back" height="20px" /> Modifica
          </button>
          <button onClick={handleModal}>
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
