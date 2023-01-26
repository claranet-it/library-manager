import { useContext } from 'react';
import { createPortal } from 'react-dom';
import { ToastContext } from '../context/toastContext';
import { ToastContextType, ToastMessage } from '../types';
import Toast from './toast';

export const ToastManager: React.FC<{}> = (): React.ReactElement => {
  const { removeToast, toast } = useContext(ToastContext) as ToastContextType;

  console.log('#### toast list', toast);
  return (
    <>
      {createPortal(
        <>
          <div className="toast_group">
            {toast?.map((toast: ToastMessage) => {
              return <Toast toast={toast} removeToast={removeToast} key={`message-${toast.id}`} />;
            })}
          </div>
        </>,
        document.body
      )}
    </>
  );
};
