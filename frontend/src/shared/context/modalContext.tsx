import { createContext, useState } from 'react';
import { ModalContextType } from '../../model';

export const ModalState = createContext<ModalContextType>({
  show: false,
  content: null,
  openModal: (content: React.ReactNode) => {},
  closeModal: () => {},
});

type Props = {
  children: JSX.Element | JSX.Element[];
};

// TODO
// Controllare la developer experience di altre librerie di come gestire la modale
export const ModalProvider: React.FC<Props> = ({ children }) => {
  const [show, setShow] = useState(false);
  const [content, setContent] = useState<React.ReactNode>(null);

  const openModal = (content: React.ReactNode) => {
    setContent(content);
    setShow(true);
  };

  const closeModal = () => {
    setShow(false);
  };

  return (
    <ModalState.Provider value={{ show, content, openModal, closeModal }}>
      {children}
    </ModalState.Provider>
  );
};
