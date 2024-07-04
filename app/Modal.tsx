import React from 'react';

type ModalProps = {
  show: boolean;
  onClose: () => void;
  message: string;
  icon?: React.ReactNode; // Adding icon prop
};

const Modal: React.FC<ModalProps> = ({ show, onClose, message }) => {
  if (!show) {
    return null;
  }
  return (
    <div
      className='fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center'
      onClick={onClose}
    >
      <div
        className='bg-white rounded-lg w-96 p-5 relative'
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className='absolute top-2 right-2 text-gray-500 hover:text-gray-700'
          onClick={onClose}
        >
          &times;
        </button>
        <div className='text-center'>
          <p className='text-lg'>{message}</p>
          <button
            className='mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700'
            onClick={onClose}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
