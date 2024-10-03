import React from 'react';

type AddNoteButtonProps = {
  onClick: () => void;
};

const AddNoteButton: React.FC<AddNoteButtonProps> = ({ onClick }) => (
  <button className='addNoteButton tooltip' onClick={onClick}>
    <span className='tooltiptext'>Agregar Nota</span>
  </button>
);

export default AddNoteButton;
