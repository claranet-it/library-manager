import { stockData } from '../../../model/label';

type Props = {
  onConfirm: () => void;
  onCancel: () => void;
};

// TODO: se la modale è aperta e navigo la history con le frecce del browser la modale rimane aperta. Dovremmo chiuderla quando cambiamo pagina.
export const ModalDelete: React.FC<Props> = ({ onConfirm, onCancel }) => {
  return (
    <>
      <p className="modal__title">{stockData.modal.title}</p>
      <p className="modal__message">{stockData.modal.message}</p>

      <div className="modal__buttons">
        <button className="modal__button modal__button--cancel" onClick={onCancel}>
          {stockData.modal.buttonCancel}
        </button>
        <button className="modal__button modal__button--confirm" onClick={onConfirm}>
          {stockData.modal.buttonConfirm}
        </button>
      </div>
    </>
  );
};
