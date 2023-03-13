import { createContext, useState } from 'react';
import { ModalContextType } from '../../model/types';

export const ModalState = createContext<{
  content: React.ReactNode;
  show: boolean;
}>({
  show: false,
  content: null,
});
export const ModalSetState = createContext<ModalContextType | null>(null);

type Props = {
  children: JSX.Element | JSX.Element[];
};

// TODO
// Controllare la developer experience di altre librerie di come gestire la modale
export const ModalProvider: React.FC<Props> = ({ children }) => {
  const [show, setShow] = useState(false);
  const [content, setContent] = useState<React.ReactNode>(null);

  const openModal = () => {
    setShow(true);
  };

  const closeModal = () => {
    setShow(false);
  };

  const setChildren = (content: React.ReactNode) => {
    setContent(content);
  };

  return (
    <ModalState.Provider value={{ show, content }}>
      <ModalSetState.Provider value={{ openModal, closeModal, setChildren }}>
        {children}
      </ModalSetState.Provider>
    </ModalState.Provider>
  );
};
