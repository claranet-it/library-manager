import { Field, Form, Formik } from 'formik';
import { Link, useParams } from 'react-router-dom';
import Arrow from '../../assets/icon/arrow-left-solid.svg';
import Spinner from '../../components/spinner';
import { stockData } from '../../data';
import { Book } from '../../types';
import { ENDPOINTS } from '../../utils/endpoint';
import { useEditBook } from './hook/useEditBook';

/**
 * The Edit component allows the user to edit an existing book by displaying a form pre-populated with the book's current information, obtained by calling the custom hook useEditBook().
 * The form, handled by the Formik library, allows the user to modify the book's title, author, description and price and submit the changes.
 * If the call to the API is successful, the user is redirected to the homepage, otherwise an error message is displayed.
 */
export const Edit = () => {
  const { id } = useParams();

  const { data: book, isError, isLoading, editData } = useEditBook(ENDPOINTS.BOOKS, parseInt(id!));

  if (isLoading) return <Spinner />;
  if (isError) return <div>Dati non caricati correttamente</div>;

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
            title: book.title,
            author: book.author,
            description: book.description,
            price: book.price,
          }}
          onSubmit={(values: Omit<Book, 'id'>) => {
            editData(values);
          }}
          validate={(values) => {
            const errors = {};
            if (values.title === '') {
              errors.title = 'Title is required';
            }

            if (values.author === '') {
              errors.author = 'Author is required';
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
                type="number"
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
