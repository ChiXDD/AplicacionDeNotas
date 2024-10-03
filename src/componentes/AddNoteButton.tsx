import React from 'react';
import { AddNoteButtonProps } from '../props/AddNoteButtonProps'; // Importar interfaz de props

// Botón para agregar nota
const AddNoteButton: React.FC<AddNoteButtonProps> = ({ onClick }) => (
  <button className='addNoteButton tooltip' onClick={onClick}>
    <span className='tooltiptext'>Agregar Nota</span>
  </button>
);

export default AddNoteButton;