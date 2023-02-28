import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BOOK } from '../../api/bookClient';
import Arrow from '../../assets/icon/arrow-left-solid.svg';
import { stockData } from '../../model/label';
import { STATUS } from '../../model/status';
import { Book, OmitID, ToastContextType } from '../../model/types';
import { BookForm } from '../../shared/components/form/BookForm';
import { ToastSetState } from '../../shared/context/toastContext';

export const CreatePage: React.FC<{}> = (): React.ReactElement => {
  const navigate = useNavigate();
  const { addToast } = useContext(ToastSetState) as ToastContextType;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createBook = async (values: OmitID<Book>): Promise<void> => {
    try {
      await BOOK.create(values);
      addToast({
        type: STATUS.SUCCESS,
        title: stockData.toastMessage.titleSuccess,
        message: stockData.toastMessage.add,
      });
      navigate('/', { replace: true });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : stockData.error;

      addToast({
        type: STATUS.ERROR,
        title: stockData.toastMessage.titleError,
        message,
      });
    }
  };

  const handleCancel = () => {
    navigate('/', { replace: true });
  };

  return (
    <>
      <div className="page create">
        <div className="topbar create__topbar">
          <Link to="/">
            <img src={Arrow} alt="back" width="30px" />
          </Link>
          <h1 className="page__title">{stockData.add}</h1>
        </div>
        <BookForm onSubmit={createBook} onCancel={handleCancel} />
      </div>
    </>
  );
};
