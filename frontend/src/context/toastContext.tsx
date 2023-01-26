import { createContext, useCallback, useState } from 'react';
import { ToastContextType, ToastMessage } from '../types';
import { uuidv4 } from '../utils/uuid';

export const ToastContext = createContext<ToastContextType | null>(null);

type Props = {
  children: JSX.Element | JSX.Element[];
};
export const ToastProvider: React.FC<Props> = ({ children }) => {
  const [toast, setToast] = useState<ToastMessage[]>([]);

  const addToast = (args: Omit<ToastMessage, 'id'>) => {
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
    <ToastContext.Provider
      value={{
        removeToast,
        addToast,
        toast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};
