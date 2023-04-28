import { useNavigate } from 'react-router-dom'
import { BOOK } from '../../api/bookClient';
import Arrow from '../../assets/icon/arrow-left-solid.svg';
import { Book, OmitID } from '../../model';
import { stockData } from '../../model/label';
import { STATUS } from '../../model/status';
import { BookForm } from '../../shared/components/form/BookForm';
import { addToast } from '../../shared/components/toast/toastManager';

export const CreatePage: React.FC<{}> = (): React.ReactElement => {
  const navigate = useNavigate();

  const createBook = async (values: OmitID<Book>): Promise<void> => {
    try {
      await BOOK.create(values);
      addToast({
        type: STATUS.SUCCESS,
        title: stockData.toastMessage.titleSuccess,
        message: stockData.toastMessage.add,
      });
      navigate(-1);
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
    navigate(-1);
  };

  return (
    <>
      <div className="page create">
        <div className="topbar create__topbar">
          <button
            onClick={() => {
              navigate(-1);
            }}
          >
            <img src={Arrow} alt="back" width="30px" />
          </button>
          <h1 className="page__title">{stockData.add}</h1>
        </div>
        <BookForm onSubmit={createBook} onCancel={handleCancel} />
      </div>
    </>
  );
};
