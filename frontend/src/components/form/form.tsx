import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { stockData } from '../../data';
import { MyInput } from './inputField';

interface Values {
  title: string;
  author: string;
  description: string;
  price: number;
}

type Props = {
  onSubmit: (values: Values) => void;
  isLoading: boolean;
};
export const BookForm = ({ onSubmit, isLoading }: Props) => {
  return (
    <div>
      <Formik
        initialValues={{
          title: '',
          author: '',
          description: '',
          price: 0,
        }}
        onSubmit={onSubmit}
        validationSchema={Yup.object({
          title: Yup.string().required('Required'),
          author: Yup.string().required('Required'),
          description: Yup.string(),
          price: Yup.number().positive().required('Required'),
        })}
      >
        <Form className="form">
          <MyInput
            label={stockData.formCreate.title}
            name="title"
            type="text"
            placeholder={stockData.formCreate.titlePlaceholder}
            required
          />
          <MyInput
            label={stockData.formCreate.author}
            name="author"
            type="text"
            placeholder={stockData.formCreate.authorPlaceholder}
            required
          />
          <MyInput
            label={stockData.formCreate.description}
            name="description"
            type="text"
            placeholder={stockData.formCreate.descriptionPlaceholder}
          />
          <MyInput
            label={stockData.formCreate.price}
            name="price"
            type="number"
            placeholder={stockData.formCreate.pricePlaceholder}
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
      </Formik>
    </div>
  );
};
