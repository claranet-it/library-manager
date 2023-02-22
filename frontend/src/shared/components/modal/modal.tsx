import { useContext } from 'react';
import { stockData } from '../../../model/data';
import { ModalContextType } from '../../../model/types';
import { ModalSetState, ModalState } from '../../context/modalContext';

export const Modal: React.FC = (): React.ReactElement => {
  const { handleModal } = useContext(ModalSetState) as ModalContextType;
  const { id, callback } = useContext(ModalState);

  const handleConfirm = () => {
    if (!id) return null;
    callback(id);
    handleModal(null, () => {});
  };

  return (
    <div className="overlay">
      <div className="modal">
        <p className="modal__title">{stockData.modal.title}</p>
        <p className="modal__message">{stockData.modal.message}</p>

        <div className="modal__buttons">
          <button
            className="modal__button modal__button--cancel"
            onClick={() => handleModal(null, () => {})}
          >
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
