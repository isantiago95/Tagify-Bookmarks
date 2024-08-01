import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { AppContext } from '../../../context/AppContext';

export interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, children }) => {
  const { dispatch } = useContext(AppContext);

  const handleClose = () => {
    dispatch({ type: 'TOGGLE_MODAL', payload: false });
    dispatch({ type: 'SET_SELECTED_NODE', payload: undefined });
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleClose}
    >
      <div
        className="bg-slate-800 text-white p-6 rounded-lg relative max-w-xs w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-0 right-2 text-2xl"
          onClick={handleClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
