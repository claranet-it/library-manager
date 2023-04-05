import { createPortal } from 'react-dom';

type Props = {
  children?: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export const Modal: React.FC<Props> = ({ children, isOpen, onClose }): React.ReactElement => {
  return createPortal(
    <>
      {isOpen && (
        <div className="overlay" onClick={onClose}>
          <div
            className="modal-container"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {children}
          </div>
        </div>
      )}
    </>,
    document.body
  );
};
