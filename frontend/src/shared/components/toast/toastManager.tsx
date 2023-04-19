import { createPortal } from 'react-dom';
import { ToastMessage } from '../../../model';
import { Toast } from '..';
import { useEffect, useState } from 'react';

let _listToast: ToastMessage[] = [];
let _listener: (listToast: ToastMessage[]) => void = () => {};

export const add = (toast: ToastMessage) => {
  _listToast = [toast, ..._listToast];
  _listener(_listToast);
};

export const remove = (id: string) => {
  _listToast = _listToast.filter((t: ToastMessage) => t.id !== id);
  _listener(_listToast);
};

export const ToastManager: React.FC<{}> = (): React.ReactElement => {
  const [toasts, setToasts] = useState<ToastMessage[]>(_listToast);

  useEffect(() => {
    _listener = setToasts;
    return () => {
      _listener = () => {};
    };
  }, []);

  return (
    <>
      {createPortal(
        <>
          <div className="toast_group">
            {toasts?.map((toast: ToastMessage) => {
              return <Toast toast={toast} removeToast={remove} key={`message-${toast.id}`} />;
            })}
          </div>
        </>,
        document.body
      )}
    </>
  );
};
