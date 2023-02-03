import { Field, Form, Formik } from 'formik';
import { useContext, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Arrow from '../../assets/icon/arrow-left-solid.svg';
import Spinner from '../../components/spinner';
import { ToastSetState } from '../../context/toastContext';
import { stockData } from '../../data';
import { STATUS } from '../../status';
import { Book, ToastContextType } from '../../types';
import Error from '..//error';
import { useEditBook } from './hook/useEditBook';

/**
 * The Edit component allows the user to edit an existing book by displaying a form pre-populated with the book's current information, obtained by calling the custom hook useEditBook().
 * The form, handled by the Formik library, allows the user to modify the book's title, author, description and price and submit the changes.
 * If the call to the API is successful, the user is redirected to the homepage, otherwise an error message is displayed.
 *
 * @returns {React.ReactElement} A react component that renders a form for editing an existing book.
 *
 * @example
 * <Edit />
 *
 */
export const Edit = () => {
  const navigate = useNavigate();
  const { addToast } = useContext(ToastSetState) as ToastContextType;

  // Get the id from the url
  const { id } = useParams() as { id: string }; // <== https://github.com/remix-run/react-router/issues/8498

  const { data: book, error, isLoading, getBookById, editData } = useEditBook();

  /**
   * Handle the edit of the book
   *
   * @param {string} id - The id of the book
   * @param {Object} body - The body of the request, containing the new information of the book
   */
  const handleEdit = (body: Omit<Book, 'id'>) => {
    editData({
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

  // Get the book by id on mount and when the id changes
  useEffect(() => {
    getBookById(id);
  }, [id]);

  if (isLoading) return <Spinner />;
  if (error.isError)
    return (
      <Error>
        <button onClick={() => navigate(-1)}>Previous Page</button>
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
