import { Field, Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import Arrow from '../../assets/icon/arrow-left-solid.svg';
import { stockData } from '../../data';
import { Book } from '../../types';
import { ENDPOINTS } from '../../utils/endpoint';
import { useCreateBook } from './hook/useCreateBook';

/**
 * Create component that renders a form for creating a new book.
 *
 * @component
 * @example
 * return (
 *  <Create />
 * )
 */
const Create: React.FC<{}> = (): React.ReactElement => {
  const navigate = useNavigate();

  const { isError, isLoading, sendData } = useCreateBook(ENDPOINTS.BOOKS);

  const createBook = (values: Omit<Book, 'id'>) => {
    sendData(values).then(() => {
      navigate('/', { replace: true });
    });
  };

  return (
    <>
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
          onSubmit={(values: Omit<Book, 'id'>) => {
            createBook(values);
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
              <p>{stockData.formCreate.info}</p>
              <label htmlFor="title">
                {stockData.formCreate.title}
                <em>*</em>
              </label>
              {errors.title && <div>{errors.title}</div>}
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
              {errors.author && <div>{errors.author}</div>}
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
      </div>
    </>
  );
};

export default Create;
