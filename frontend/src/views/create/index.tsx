import { Field, Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import Arrow from '../../assets/icon/arrow-left-solid.svg';
import { api } from '../../utils/API';

interface Values {
  title: string;
  author: string;
  description: string;
  price: number;
}

function Create() {
  const navigate = useNavigate();

  async function createBook(values: Values) {
    const URL = 'http://localhost:8080/api/books';
    const body = JSON.stringify(values, null, 2);
    try {
      const rawResponse = await api.postFetch(URL, body);
      const content = await rawResponse.json();
      console.log(content);
      navigate('/', { replace: true });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="page create">
      <div className="topbar create__topbar">
        <Link to="/">
          <img src={Arrow} alt="back" width="30px" />
        </Link>
        <h1 className="page__title">Aggiungi nuovo libro</h1>
      </div>
      <Formik
        initialValues={{
          title: '',
          author: '',
          description: '',
          price: 0,
        }}
        onSubmit={(values: Values) => {
          createBook(values);
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
            <button
              className="button button--red"
              type="button"
              onClick={() => console.log('#### annulla operazione')}
            >
              Annulla
            </button>
          </Link>
        </Form>
      </Formik>
    </div>
  );
}

export default Create;
