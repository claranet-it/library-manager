import { Field, Form, Formik, FormikHelpers } from 'formik';
import { Link } from 'react-router-dom';
import Arrow from "../../assets/icon/arrow-left-solid.svg";

interface Values {
  title: string;
  author: string;
  price: number;
}

function Create() {
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
          price: 0,
        }}
        onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
        }}
      >
        <Form className="form">
          <p>Compila il modulo con i campi richiesti.</p>
          <label htmlFor="title">Titolo<em>*</em></label>
          <Field id="title" name="title" placeholder="Inserisci il titolo del libro" type="text" required />

          <label htmlFor="author">Autore<em>*</em></label>
          <Field id="author" name="author" placeholder="Inserisci nome dell'autore" type="text" required />

          <label htmlFor="price">Prezzo €<em>*</em></label>
          <Field id="price" name="price" placeholder="Inserisci prezzo" type="number" min="0" step="0.01" required />

          <button className="button button--green" type="submit">Salva</button>

          <Link to="/">
            <button className="button button--red" type="button" onClick={() => (console.log("#### annulla operazione"))}>Annulla</button>
          </Link>

        </Form>
      </Formik>
    </div>
  );
}

export default Create;
