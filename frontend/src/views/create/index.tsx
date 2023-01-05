import { Field, Form, Formik, FormikHelpers } from 'formik';
import { Link } from 'react-router-dom';
import Arrow from '../../assets/icon/arrow-left-solid.svg';

interface Values {
  title: string;
  author: string;
  description: string;
  price: number;
}

function Create() {
  // const requestOptions = {
  //   method: 'GET',
  //   headers: {
  //     contentType: 'application/json',
  //   },
  // };

  // async function createBook() {
  //   try {
  //     const requestOptions = {
  //       method: 'GET',
  //       headers: {
  //         contentType: 'application/json',
  //       },
  //     };
  //     const res = await fetch(
  //       `http://localhost:8080/api/books?offset=0&limit=${formik.values}`,
  //       requestOptions
  //     );

  //     // navigate("/home", { replace: true })
  //   } catch (error) {
  //     console.log('error signing in', error);
  //   }
  // }
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
        // TODO
        // Aggiugnere descrizio
        onSubmit={async (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
          console.log(JSON.stringify(values));
          console.log(
            JSON.stringify({
              title: 'Clean Code',
              author: 'Robert Cecil Martin',
              description: "Books description's",
              price: 34.99,
            })
          );

          const rawResponse = await fetch('http://localhost:8080/api/books', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            // body: JSON.stringify({
            //   title: 'Clean Code',
            //   author: 'Robert Cecil Martin',
            //   description: "Books description's",
            //   price: 34.99,
            // }),

            body: JSON.stringify(values, null, 2),

            // JSON.stringify(values, null, 2)
          });

          const content = await rawResponse.json();
          console.log(content);
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
