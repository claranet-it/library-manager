import { useContext } from 'react';
import { createPortal } from 'react-dom';
import { Modal } from '../components/modal/modal';
import { ModalState } from '../context/modalContext';

export const ModalManager: React.FC<{}> = (): React.ReactElement => {
  const { isOpen } = useContext(ModalState);

  return <>{createPortal(<>{isOpen && <Modal />}</>, document.body)}</>;
};
