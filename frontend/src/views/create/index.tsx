import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Arrow from '../../assets/icon/arrow-left-solid.svg';
import { BookForm } from '../../components/form/form';
import { ToastSetState } from '../../context/toastContext';
import { stockData } from '../../data';
import { STATUS } from '../../status';
import { Book, ToastContextType } from '../../types';
import { useCreateBook } from './hook/useCreateBook';

/**
 * Create component that renders a form for creating a new book.
 *
 * @returns {React.ReactElement} A react component that renders a form for creating a new book,
 * it allows to submit a form and handle errors if they occurs.
 *
 * @example
 *  <Create />
 */
const Create: React.FC<{}> = (): React.ReactElement => {
  const navigate = useNavigate();
  const { addToast } = useContext(ToastSetState) as ToastContextType;
  const { error, isLoading, sendData } = useCreateBook();

  /**
   * Create a new book by sending the form data to the server and navigate to homepage.
   * @async
   *
   * @param {Object} values - The values of the form, it should contain the properties of a book object, except the id.
   *
   */
  const createBook = async (values: Omit<Book, 'id'>) => {
    await sendData(values)
      .then(() => {
        addToast({
          type: STATUS.SUCCESS,
          title: stockData.toastMessage.titleSuccess,
          message: stockData.toastMessage.add,
        });
        navigate('/', { replace: true });
      })
      .catch(() => {
        addToast({
          type: STATUS.ERROR,
          title: stockData.toastMessage.titleError,
          message: stockData.toastMessage.genericError,
        });
      });
  };

  const handleCancel = () => {
    navigate('/', { replace: true });
  };

  if (error.isError) return <div>{error.message}</div>;

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

export default Create;
