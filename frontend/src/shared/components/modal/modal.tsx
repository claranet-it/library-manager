import { useContext } from 'react';
import { ModalState } from '../../context/modalContext';

type Props = {
  children?: React.ReactNode;
};

export const Modal: React.FC<Props> = ({ children }): React.ReactElement => {
  const { closeModal } = useContext(ModalState);

  return (
    <div
      className="overlay"
      onClick={() => {
        closeModal();
      }}
    >
      <div
        className="modal-container"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
};
