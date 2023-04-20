import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BOOK } from '../../api/bookClient';
import Arrow from '../../assets/icon/arrow-left-solid.svg';
import Pen from '../../assets/icon/pen-solid.svg';
import Trash from '../../assets/icon/trash-solid.svg';
import { Book, OmitID, STATUS, TError } from '../../model';
import { stockData } from '../../model/label';
import { BookForm } from '../../shared/components';
import { ErrorMessage } from '../../shared/components/error';
import { Modal } from '../../shared/components/modal/modal';
import { Spinner } from '../../shared/components/spinner/Spinner';
import { addToast } from '../../shared/components/toast/toastManager';
import { ModalDelete } from './components/ModalDelete';

export const DetailPage: React.FC = (): React.ReactElement => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [book, setBook] = useState<Book | null>(null);
  const [error, setError] = useState<TError>({ isError: false, message: '' });

  const [editingModal, setEditingModal] = useState<boolean>(false);
  const [deletingModal, setDeletingModal] = useState<boolean>(false);
  const { id = '' } = useParams();

  const getBook = async () => {
    try {
      setError((prev) => ({ ...prev, isError: false }));
      setIsLoading(true);

      const data = await BOOK.getById(id);
      setBook(data);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : stockData.error;
      setError((prev) => ({
        ...prev,
        isError: true,
        message,
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalDelete = () => {
    setDeletingModal(true);
  };

  const handleModalEdit = () => {
    setEditingModal(true);
  };

  const handleEdit = async (body: OmitID<Book>): Promise<void> => {
    try {
      await BOOK.update({
        id,
        ...body,
      });
      addToast({
        type: STATUS.SUCCESS,
        title: stockData.toastMessage.titleSuccess,
        message: stockData.toastMessage.put,
      });
      getBook();
      setEditingModal(false);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : stockData.error;
      addToast({
        type: STATUS.ERROR,
        title: stockData.toastMessage.titleError,
        message,
      });
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await BOOK.delete(id);
      addToast({
        type: STATUS.SUCCESS,
        title: stockData.toastMessage.titleSuccess,
        message: stockData.toastMessage.delete,
      });
      navigate('/', { replace: true });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : stockData.error;
      addToast({
        type: STATUS.ERROR,
        title: stockData.toastMessage.titleError,
        message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBook();
  }, [id]);

  if (isLoading) return <Spinner />;

  if (error.isError) return <ErrorMessage message={error.message} />;

  return (
    <div className="page detail">
      <div className="topbar detail__topbar">
        <Link to="/">
          <img src={Arrow} alt="back" width="30px" />
        </Link>
        <h1 className="page__title">Dettaglio libro</h1>
      </div>

      {book && (
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
      )}

      <Modal
        isOpen={editingModal}
        onClose={() => {
          setEditingModal(false);
        }}
      >
        <BookForm
          onSubmit={handleEdit}
          onCancel={() => {
            setEditingModal(false);
          }}
          values={book!}
        />
      </Modal>

      <Modal
        isOpen={deletingModal}
        onClose={() => {
          setDeletingModal(false);
        }}
      >
        <ModalDelete
          onConfirm={() => {
            handleDelete();
          }}
          onCancel={() => {
            setDeletingModal(false);
          }}
        />
      </Modal>
    </div>
  );
};
