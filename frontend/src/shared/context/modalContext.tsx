import { createContext, useState } from 'react';
import { ModalContextType } from '../types';

export const ModalState = createContext<{
  isOpen: boolean;
  id: string | null;
  callback: (id?: string) => void;
}>({
  isOpen: false,
  id: null,
  callback: () => {},
});
export const ModalSetState = createContext<ModalContextType | null>(null);

type Props = {
  children: JSX.Element | JSX.Element[];
};

export const ModalProvider: React.FC<Props> = ({ children }) => {
  const [modal, setModal] = useState<{ isOpen: boolean; id: string | null; callback: () => void }>({
    isOpen: false,
    id: null,
    callback: () => {},
  });

  const handleModal = async (id: string | null, callback: () => void) => {
    setModal((prev) => ({ ...prev, isOpen: !prev.isOpen, id: id, callback: callback }));
  };

  // const onConfirm = async (params?: () => void) => {
  //   if (params) {
  //     await params;
  //   }
  //   setModal(!modal);
  // };

  return (
    <ModalState.Provider value={modal}>
      <ModalSetState.Provider value={{ handleModal }}>{children}</ModalSetState.Provider>
    </ModalState.Provider>
  );
};
