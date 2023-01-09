import { Field, Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import Arrow from '../../assets/icon/arrow-left-solid.svg';
import { stockData } from '../../data';

interface Values {
  title: string;
  author: string;
  description: string;
  price: number;
}

function Create() {
  const navigate = useNavigate();

  async function createBook(values: Values) {
    try {
      const rawResponse = await fetch('http://localhost:8080/api/books', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values, null, 2),
      });
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
        <h1 className="page__title">{stockData.add}</h1>
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
          <p>{stockData.formCreate.info}</p>
          <label htmlFor="title">
            {stockData.formCreate.title}
            <em>*</em>
          </label>
          <Field
            id="title"
            name="title"
            placeholder={stockData.formCreate.titlePlaceholder}
            type="text"
            required
          />

          <label htmlFor="author">
            {stockData.formCreate.author}
            <em>*</em>
          </label>
          <Field
            id="author"
            name="author"
            placeholder={stockData.formCreate.authorPlaceholder}
            type="text"
            required
          />

          <label htmlFor="description">{stockData.formCreate.description}</label>
          <Field
            id="description"
            name="description"
            placeholder={stockData.formCreate.descriptionPlaceholder}
            type="text"
          />

          <label htmlFor="price">
            {stockData.formCreate.price}
            <em>*</em>
          </label>
          <Field
            id="price"
            name="price"
            placeholder={stockData.formCreate.pricePlaceholder}
            type="number"
            min="0"
            step="0.01"
            required
          />

          <button className="button button--green" type="submit">
            {stockData.formCreate.buttonSubmit}
          </button>

          <Link to="/">
            <button
              className="button button--red"
              type="button"
              // onClick={() => console.log('#### annulla operazione')}
            >
              {stockData.formCreate.buttonCancel}
            </button>
          </Link>
        </Form>
      </Formik>
    </div>
  );
}

export default Create;
