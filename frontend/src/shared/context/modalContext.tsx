import { createContext, useState } from 'react';
import { ModalContextType } from '../../model/types';

export const ModalState = createContext<{
  callback: { callback: (confirmed: boolean) => void };
  show: boolean;
}>({
  callback: { callback: (confirmed: boolean) => {} },
  show: false,
});
export const ModalSetState = createContext<ModalContextType | null>(null);

type Props = {
  children: JSX.Element | JSX.Element[];
};

export const ModalProvider: React.FC<Props> = ({ children }) => {
  const [show, setShow] = useState(false);
  const [callback, setCallback] = useState<{ callback: (confirmed: boolean) => void }>({
    callback: (confirmed: boolean) => {},
  });

  const onOpen = () => {
    setShow(true);
  };

  const onClose = () => {
    setShow(false);
  };

  const handleModal = async (callback: (confirmed: boolean) => void) => {
    setCallback({ callback: callback });
  };

  return (
    <ModalState.Provider value={{ callback, show }}>
      <ModalSetState.Provider value={{ handleModal, onOpen, onClose }}>
        {children}
      </ModalSetState.Provider>
    </ModalState.Provider>
  );
};
