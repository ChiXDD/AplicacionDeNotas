import React from 'react';

type ConfirmationModalProps = {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ message, onConfirm, onCancel }) => {
  return (
    <div className='confirmationModalContainer' onClick={onCancel}>
      <div className='confirmationModal' onClick={(e) => e.stopPropagation()}>
        <p>{message}</p>
        <div className="buttonsContainer">
          <button className="confirmButton tooltip" onClick={onConfirm}>
            <span className="tooltiptext">Confirmar</span>
          </button>
          <button className="cancelButton tooltip" onClick={onCancel}>
            <span className="tooltiptext">Cancelar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;