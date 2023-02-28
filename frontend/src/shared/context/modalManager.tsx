import { useContext } from 'react';
import { createPortal } from 'react-dom';
import { Modal } from '../components/modal/modal';
import { ModalState } from '../context/modalContext';

export const ModalManager: React.FC<{}> = (): React.ReactElement => {
  const { show } = useContext(ModalState);

  return <>{createPortal(<>{show && <Modal />}</>, document.body)}</>;
};
