import React from 'react';
import Modal from 'react-modal';
import { FaExclamationTriangle } from 'react-icons/fa';

interface ModalProps {
  isOpen: boolean;
  onYes: () => void;
  onNo: () => void;
  onClose: () => void;
}

export const AskModal: React.FC<ModalProps> = ({
  isOpen,
  onYes,
  onNo,
  onClose,
}) => {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'rgba(20, 20, 30, 1)', // Dark mode background
      color: 'text-white', // Text color for dark mode
      border: 'border-slate-700', // Border color for dark mode
    },
    overlay: {
      backgroundColor: 'rgba(30, 41, 59, 0.75)', // Overlay color
    },
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <div className="rounded flex justify-left items-center space-x-2 mb-2">
        <FaExclamationTriangle size="30" color="orange" />
        <h2 className="rounded text-sm text-orange-300">Save the result?</h2>
      </div>
      <div className="rounded font-mono font-normal text-white text-sm">
        The current result has not been saved. Would you like to save it before
        closing?
      </div>
      <div className="rounded flex justify-end space-x-4 mt-4">
        <button
          onClick={onYes}
          className="rounded px-4 py-1 bg-blue-500 text-white text-sm rounded-full hover:bg-blue-600 transition duration-200"
        >
          Yes
        </button>
        <button
          onClick={onNo}
          className="rounded px-4 py-1 bg-blue-500 text-white text-sm rounded-full hover:bg-blue-600 transition duration-200"
        >
          No
        </button>
        <button
          onClick={onClose}
          className="rounded px-4 py-1 bg-red-500 text-white text-sm rounded-full hover:bg-red-600 transition duration-200"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};
