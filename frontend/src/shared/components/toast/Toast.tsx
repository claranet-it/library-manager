import { useEffect } from 'react';
import { ToastMessage } from '../../../model/types';

type Props = {
  toast: ToastMessage;
  removeToast: (id: string) => void;
};

export const Toast: React.FC<Props> = ({ toast, removeToast }): React.ReactElement => {
  const { type, title, message, id } = toast;
  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(id);
    }, 10000);
  }, []);

  return (
    <div onClick={() => removeToast(id)} className={`toast toast--${type}`}>
      <p>{title}</p>
      <p>{message}</p>
    </div>
  );
};
