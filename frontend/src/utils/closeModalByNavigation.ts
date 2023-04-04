import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ModalState } from '../shared/context/modalContext';

export default function closeModalByNavigation() {
  const location = useLocation();
  const { closeModal } = useContext(ModalState);
  useEffect(() => {
    closeModal();
  }, [location]);
}
