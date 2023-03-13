import { useContext } from 'react';
import { createPortal } from 'react-dom';
import { Modal } from '../components/modal/modal';
import { ModalState } from '../context/modalContext';

export const ModalManager: React.FC<{}> = (): React.ReactElement => {
  const { show, content } = useContext(ModalState);

  return <>{createPortal(<>{show && <Modal>{content}</Modal>}</>, document.body)}</>;
};
