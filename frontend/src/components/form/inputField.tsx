import { useField } from 'formik';

type Props = {
  label: string;
  name: string;
  placeholder: string;
  type: string;
};

export const InputField = ({ label, name, placeholder, type }: Props) => {
  const [field, meta] = useField({ name, placeholder, type });

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input {...field} id={name} name={name} type={type} placeholder={placeholder} />
      {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </>
  );
};
