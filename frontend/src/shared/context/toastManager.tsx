import { useContext } from 'react';
import { createPortal } from 'react-dom';
import { ToastMessage } from '../../model';
import { Toast } from '../components';
import { ToastState } from './toastContext';

export const ToastManager: React.FC<{}> = (): React.ReactElement => {
  const { toast, removeToast } = useContext(ToastState);

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
