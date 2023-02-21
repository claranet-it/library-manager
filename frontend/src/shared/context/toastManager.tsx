import { useContext } from 'react';
import { createPortal } from 'react-dom';
import { ToastContextType, ToastMessage } from '../../types';
import { Toast } from '../components';
import { ToastSetState, ToastState } from './toastContext';

export const ToastManager: React.FC<{}> = (): React.ReactElement => {
  const { removeToast } = useContext(ToastSetState) as ToastContextType;
  const toast = useContext(ToastState) as ToastMessage[];

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
