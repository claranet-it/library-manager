import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { stockData } from '../../data';
import { Book } from '../../types';
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
  values?: Book;
  onCancel: () => void;
};

export const BookForm = ({ onSubmit, isLoading, values, onCancel }: Props) => {
  const validateSchema = Yup.object({
    title: Yup.string().required('Required'),
    author: Yup.string().required('Required'),
    description: Yup.string(),
    price: Yup.number().positive().required('Required'),
  });

  const initialValues = {
    title: values?.title || '',
    author: values?.author || '',
    description: values?.description || '',
    price: values?.price || 0,
  };

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validateSchema}>
        <Form className="form">
          <MyInput
            label={stockData.formCreate.title}
            name="title"
            type="text"
            placeholder={stockData.formCreate.titlePlaceholder}
          />
          <MyInput
            label={stockData.formCreate.author}
            name="author"
            type="text"
            placeholder={stockData.formCreate.authorPlaceholder}
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
          />
          <button className="button button--green" type="submit">
            {isLoading
              ? `${stockData.formCreate.buttonLoading}`
              : `${stockData.formCreate.buttonSubmit}`}
          </button>

          <button className="button button--red" type="button" onClick={onCancel}>
            {stockData.formCreate.buttonCancel}
          </button>
        </Form>
      </Formik>
    </div>
  );
};
