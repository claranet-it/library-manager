import { useField } from 'formik';

export const InputField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  console.log('### meta', props);
  return (
    <>
      <label htmlFor={props.id || props.name}>
        {props.required && <em>*</em>} {label}
      </label>
      <input {...field} {...props} />
      {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </>
  );
};
