import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Arrow from '../../assets/icon/arrow-left-solid.svg';
import { ToastSetState } from '../../context/toastContext';
import { stockData } from '../../data';
import { ErrorMessage } from '../../shared/components/error/Error';
import { BookForm } from '../../shared/components/form/BookForm';
import { STATUS } from '../../status';
import { Book, OmitID, TError, ToastContextType } from '../../types';
import { API } from '../../utils/bookClient';

export const Create: React.FC<{}> = (): React.ReactElement => {
  const navigate = useNavigate();
  const { addToast } = useContext(ToastSetState) as ToastContextType;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<TError>({ isError: false, message: '' });

  const createBook = (values: OmitID<Book>) => {
    setIsLoading(true);
    API.createBook(values)
      .then(() => {
        addToast({
          type: STATUS.SUCCESS,
          title: stockData.toastMessage.titleSuccess,
          message: stockData.toastMessage.add,
        });
        navigate('/', { replace: true });
      })
      .catch((error) => {
        addToast({
          type: STATUS.ERROR,
          title: stockData.toastMessage.titleError,
          message: error.message,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCancel = () => {
    navigate('/', { replace: true });
  };

  if (error.isError) return <ErrorMessage message={error.message} />;

  return (
    <>
      <div className="page create">
        <div className="topbar create__topbar">
          <Link to="/">
            <img src={Arrow} alt="back" width="30px" />
          </Link>
          <h1 className="page__title">{stockData.add}</h1>
        </div>
        <BookForm onSubmit={createBook} isLoading={isLoading} onCancel={handleCancel} />
      </div>
    </>
  );
};
