import { createContext, useCallback, useState } from 'react';
import { OmitID, ToastContextType, ToastMessage } from '../types';
import { uuidv4 } from '../utils/uuid';

export const ToastState = createContext<ToastMessage[]>([]);
export const ToastSetState = createContext<ToastContextType | null>(null);

type Props = {
  children: JSX.Element | JSX.Element[];
};

export const ToastProvider: React.FC<Props> = ({ children }) => {
  const [toast, setToast] = useState<ToastMessage[]>([]);

  const addToast = (args: OmitID<ToastMessage>) => {
    setToast([
      ...toast,
      {
        id: uuidv4(),
        ...args,
      },
    ]);
  };

  const removeToast = useCallback(
    (id: string) => {
      setToast((toast: ToastMessage[]) => toast.filter((t: ToastMessage) => t.id !== id));
    },
    [setToast]
  );

  return (
    <ToastState.Provider value={toast}>
      <ToastSetState.Provider
        value={{
          removeToast,
          addToast,
        }}
      >
        {children}
      </ToastSetState.Provider>
    </ToastState.Provider>
  );
};
