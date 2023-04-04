import { createContext, useCallback, useState } from 'react';
import { OmitID, ToastContextType, ToastMessage } from '../../model';
import { uuidv4 } from '../../utils/uuid';

export const ToastState = createContext<ToastContextType>({
  toast: [],
  removeToast: (index: string) => {},
  addToast: (args: OmitID<ToastMessage>) => {},
});

type Props = {
  children: JSX.Element | JSX.Element[];
};

export const ToastProvider: React.FC<Props> = ({ children }) => {
  const [toast, setToast] = useState<ToastMessage[]>([]);

  const addToast = (args: OmitID<ToastMessage>) => {
    setToast((prev) => [
      ...prev,
      {
        id: uuidv4(),
        ...args,
      },
    ]);
  };

  const removeToast = useCallback(
    (id: string) => {
      setToast((prev) => prev.filter((t: ToastMessage) => t.id !== id));
    },
    [setToast]
  );

  return (
    <ToastState.Provider value={{ toast, removeToast, addToast }}>{children}</ToastState.Provider>
  );
};
