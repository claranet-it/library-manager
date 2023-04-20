import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Toast } from '..';
import { OmitID, ToastMessage } from '../../../model';
import { uuidv4 } from '../../../utils/uuid';

let _listToast: ToastMessage[] = [];
let _listener: (listToast: ToastMessage[]) => void = () => {};

export const addToast = (toast: OmitID<ToastMessage>) => {
  _listToast = [{ ...toast, id: uuidv4() }, ..._listToast];
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
