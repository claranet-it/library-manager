import { useContext } from 'react';
import { stockData } from '../../../model/label';
import { ModalContextType } from '../../../model/types';
import { ModalSetState, ModalState } from '../../context/modalContext';

export const Modal: React.FC = (): React.ReactElement => {
  const { onClose } = useContext(ModalSetState) as ModalContextType;
  const { callback } = useContext(ModalState);

  const handleConfirm = () => {
    callback.callback(true);
  };

  const handleCancel = () => {
    callback.callback(false);
  };

  return (
    <div
      className="overlay"
      onClick={() => {
        // close modal when outside of modal is clicked
        onClose();
      }}
    >
      <div
        className="modal"
        onClick={(e) => {
          // do not close modal if anything inside modal content is clicked
          e.stopPropagation();
        }}
      >
        <p className="modal__title">{stockData.modal.title}</p>
        <p className="modal__message">{stockData.modal.message}</p>

        <div className="modal__buttons">
          <button className="modal__button modal__button--cancel" onClick={handleCancel}>
            {stockData.modal.buttonCancel}
          </button>
          <button className="modal__button modal__button--confirm" onClick={handleConfirm}>
            {stockData.modal.buttonConfirm}
          </button>
        </div>
      </div>
    </div>
  );
};
