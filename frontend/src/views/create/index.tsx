import { Field, Form, Formik, FormikHelpers } from 'formik';

interface Values {
  title: string;
  author: string;
  price: number;
}

function Create() {
  return (
    <div className="page">
      <h1>Aggiugni nuovo libro</h1>
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
        <Form>
          <label htmlFor="title">Titolo</label>
          <Field id="title" name="title" placeholder="Inserisci il titolo del libro" />

          <label htmlFor="author">Autore</label>
          <Field id="author" name="author" placeholder="Inserisci Autore" />

          <label htmlFor="price">Prezzo</label>
          <Field id="price" name="price" placeholder="Inserisci prezzo" type="number" />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Create;
