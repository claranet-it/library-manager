import { useContext } from 'react';
import { ModalContextType } from '../../../model/types';
import { ModalSetState } from '../../context/modalContext';

type Props = {
  children?: React.ReactNode;
};

export const Modal: React.FC<Props> = ({ children }): React.ReactElement => {
  const { closeModal } = useContext(ModalSetState) as ModalContextType;
  /* const { callback } = useContext(ModalState);
   */
  /*  const handleConfirm = () => {
    callback.callback(true);
  };

  const handleCancel = () => {
    callback.callback(false);
  }; */

  return (
    <div
      className="overlay"
      onClick={() => {
        // close modal when outside of modal is clicked
        closeModal();
      }}
    >
      <div
        className="modal-container"
        onClick={(e) => {
          // do not close modal if anything inside modal content is clicked
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
};
