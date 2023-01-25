import { useEffect } from 'react';

type Props = {
  message: string;
  id: number;
  removeToast: (id: number) => void;
};

const Toast: React.FC<Props> = ({ message, id, removeToast }): React.ReactElement => {
  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(id);
    }, 1500);
  }, []);

  return (
    <div onClick={() => removeToast(id)} className="toast">
      <p>{message}</p>
    </div>
  );
};

export default Toast;
