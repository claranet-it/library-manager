import { Field, Form, Formik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Arrow from '../../assets/icon/arrow-left-solid.svg';
import { Error } from '../../components';
import Spinner from '../../components/spinner';
import { ToastSetState } from '../../context/toastContext';
import { stockData } from '../../data';
import { STATUS } from '../../status';
import { Book, TError, ToastContextType } from '../../types';
import { API } from '../../utils/bookClient';

export const Edit = () => {
  const navigate = useNavigate();

  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<TError>({ isError: false, message: '' });

  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    API.getBook(id)
      .then((data) => {
        setBook(data);
        setIsLoading(false);
      })
      .catch((error: Error) => {
        setError({ isError: true, message: error.message });
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  const { addToast } = useContext(ToastSetState) as ToastContextType;
  const handleEdit = (body: Omit<Book, 'id'>) => {
    if (!id) return;
    API.updateBook({
      id,
      ...body,
    })
      .then(() => {
        addToast({
          type: STATUS.SUCCESS,
          title: stockData.toastMessage.titleSuccess,
          message: stockData.toastMessage.put,
        });
        navigate('/', { replace: true });
      })
      .catch((error) => {
        addToast({
          type: STATUS.ERROR,
          title: stockData.toastMessage.titleError,
          message: error.message,
        });
      });
  };

  if (isLoading) return <Spinner />;

  if (error.isError)
    return (
      <Error message={error.message}>
        <button onClick={() => navigate(-1)}>⬅️ Back</button>
      </Error>
    );

  return (
    <div className="page create">
      <div className="topbar create__topbar">
        <Link to="/">
          <img src={Arrow} alt="back" width="30px" />
        </Link>
        <h1 className="page__title">Modifica libro</h1>
      </div>
      {book && (
        <Formik
          initialValues={{
            title: book?.title,
            author: book?.author,
            description: book?.description,
            price: book?.price,
          }}
          onSubmit={handleEdit}
          validate={(values) => {
            const errors = {} as any;
            if (!values) {
              errors.title = 'Values is required';
              errors.author = 'Values is required';
              errors.price = 'Values is required';
            } else {
              if (!values.title?.match(/\S/)) {
                errors.title = 'Title is required';
              }
              if (!values.author?.match(/\S/)) {
                errors.author = 'Author is required';
              }
            }
            return errors;
          }}
        >
          {({ errors }) => (
            <Form className="form">
              <p>Compila il modulo con i campi richiesti.</p>
              <label htmlFor="title">
                Titolo<em>*</em>
              </label>
              {errors.title && <div>{errors.title}</div>}
              <Field
                id="title"
                name="title"
                placeholder="Inserisci il titolo del libro"
                type="text"
                required
              />

              <label htmlFor="author">
                Autore<em>*</em>
              </label>
              {errors.author && <div>{errors.author}</div>}
              <Field
                id="author"
                name="author"
                placeholder="Inserisci nome dell'autore"
                type="text"
                required
              />

              <label htmlFor="description">Descrizione</label>
              <Field
                id="description"
                name="description"
                placeholder="Inserisci la descrizione del libro"
                type="text"
              />

              <label htmlFor="price">
                Prezzo €<em>*</em>
              </label>
              <Field
                id="price"
                name="price"
                placeholder="Inserisci prezzo"
                type="text"
                min="0"
                step="0.01"
                required
              />

              <button className="button button--green" type="submit">
                {isLoading
                  ? `${stockData.formCreate.buttonLoading}`
                  : `${stockData.formCreate.buttonSubmit}`}
              </button>

              <Link to="/">
                <button className="button button--red" type="button">
                  {stockData.formCreate.buttonCancel}
                </button>
              </Link>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};
