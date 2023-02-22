import { Form, Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { stockData } from '../../../model/data';
import { Book, OmitID } from '../../../model/types';
import { InputField } from './InputField';

interface Values {
  title: string;
  author: string;
  description: string;
  price: number;
}

type Props = {
  onSubmit: (values: OmitID<Book>) => Promise<void>;
  values?: Book;
  onCancel: () => void;
};

const validateSchema = Yup.object({
  title: Yup.string().required('Required'),
  author: Yup.string().required('Required'),
  description: Yup.string(),
  price: Yup.number().positive().required('Required'),
});

export const BookForm: React.FC<Props> = ({ onSubmit, values, onCancel }): React.ReactElement => {
  const initialValues = {
    title: values?.title || '',
    author: values?.author || '',
    description: values?.description || '',
    price: values?.price || 0,
  };

  const [isLoading, setIsLoading] = useState(false);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        setIsLoading(true);
        try {
          await onSubmit(values);
        } catch (error) {}
        setIsLoading(false);
      }}
      validationSchema={validateSchema}
    >
      <Form className="form">
        <InputField
          label={stockData.formCreate.title}
          name="title"
          type="text"
          placeholder={stockData.formCreate.titlePlaceholder}
        />
        <InputField
          label={stockData.formCreate.author}
          name="author"
          type="text"
          placeholder={stockData.formCreate.authorPlaceholder}
        />
        <InputField
          label={stockData.formCreate.description}
          name="description"
          type="text"
          placeholder={stockData.formCreate.descriptionPlaceholder}
        />
        <InputField
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
  );
};
