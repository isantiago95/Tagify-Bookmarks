import { useState } from 'react';
import Modal from '../pages/bookmarks/components/Modal';

interface UseModalReturn {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  Modal: typeof Modal;
}

const useModal = (): UseModalReturn => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return {
    isOpen,
    openModal,
    closeModal,
    Modal,
  };
};

export default useModal;
