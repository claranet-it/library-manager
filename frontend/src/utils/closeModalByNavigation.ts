import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ModalContextType } from '../model/types';
import { ModalSetState } from '../shared/context/modalContext';

export default function closeModalByNavigation() {
  const location = useLocation();
  const { closeModal } = useContext(ModalSetState) as ModalContextType;
  useEffect(() => {
    closeModal();
  }, [location]);
}
