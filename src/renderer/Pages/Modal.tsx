import React from 'react';
import Modal from 'react-modal';

interface ModalProps {
  isOpen: boolean;
  onOk: () => void;
  onClose: () => void;
}

export const AskModal: React.FC<ModalProps> = ({ isOpen, onOk, onClose }) => {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'bg-slate-800', // Dark mode background
      color: 'text-white', // Text color for dark mode
      border: 'border-slate-700', // Border color for dark mode
    },
    overlay: {
      backgroundColor: 'rgba(30, 41, 59, 0.75)', // Overlay color
    },
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <h2 className="text-lg font-bold text-orange-800">Warning</h2>
      <div className="font-mono font-bold text-sky-600">
        This action will lost the current work progress.
      </div>
      <div className="flex justify-end space-x-4 mt-4">
        <button
          onClick={onOk}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
        >
          OK
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};
