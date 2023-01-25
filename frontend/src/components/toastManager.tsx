import { useContext } from 'react';
import { createPortal } from 'react-dom';
import { ToastContext } from '../context';
import Toast from './toast';

export const ToastManager: React.FC<{}> = (): React.ReactElement => {
  const [toast, setToast] = useContext(ToastContext);

  const removeToast = (index: number): void => {
    setToast(toast.filter((itm: { id: number }) => index != itm.id));
  };

  return (
    <>
      {createPortal(
        <>
          <div className="toast_group">
            {toast?.map((message: { message: string; id: any }) => {
              const { message: msg, id } = message;
              return (
                <Toast message={msg} id={id} removeToast={removeToast} key={`message-${id}`} />
              );
            })}
          </div>
        </>,
        document.body
      )}
    </>
  );
};
