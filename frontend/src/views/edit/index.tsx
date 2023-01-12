import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Arrow from '../../assets/icon/arrow-left-solid.svg';
import { Book } from '../../types';

interface Values {
  title: string;
  author: string;
  description?: string;
  price: number;
}

export const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [book, setBook] = useState<Book>();

  async function getBook(id: number) {
    try {
      const rawResponse = await fetch(`http://localhost:8080/api/books/${id}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const content = await rawResponse.json();
      setBook(content);
    } catch (error) {
      console.log(error);
    }
  }

  async function updateBook(values: Values) {
    try {
      const rawResponse = await fetch(`http://localhost:8080/api/books/${id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values, null, 2),
      });
      const content = await rawResponse.json();
      navigate('/', { replace: true });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getBook(parseInt(id!));
  }, [id]);

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
          onSubmit={(values: Values) => {
            updateBook(values);
          }}
        >
          <Form className="form">
            <p>Compila il modulo con i campi richiesti.</p>
            <label htmlFor="title">
              Titolo<em>*</em>
            </label>
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
              Salva
            </button>

            <Link to="/">
              <button className="button button--red" type="button">
                Annulla
              </button>
            </Link>
          </Form>
        </Formik>
      )}
    </div>
  );
};
