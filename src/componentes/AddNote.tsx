import { useContext, useState } from 'react';
import NoteContext from '../context/NoteContext';
import ConfirmationModal from './ConfirmationModal'; // Modal de confirmación
import { AddNoteDialogProps } from '../props/AddNoteDialogProps'; // Importar interfaz de props

const AddNoteDialog: React.FC<AddNoteDialogProps> = ({ onClose, initialNote, isEdit = false }) => {
  const { dispatch } = useContext(NoteContext); // Obtener el dispatch del contexto
  const [title, setTitle] = useState(initialNote?.title || '');// Agregar estado para el título
  const [content, setContent] = useState(initialNote?.content || ''); // Agregar estado para el contenido
  const [category, setCategory] = useState(initialNote?.category || ''); // Agregar estado para la categoría
  const [tags, setTags] = useState(initialNote?.tags || ''); // Agregar estado para las etiquetas
  const [showConfirmModal, setShowConfirmModal] = useState(false); // Estado para mostrar el modal de confirmación
  const [errorMessage, setErrorMessage] = useState(''); // Estado para mostrar mensajes de error

  // Función para manejar el guardado de la nota
  const handleSave = () => {
    if (!title || !content) {
      setErrorMessage('Por favor, completa el título y el contenido de la nota.'); // Mostrar mensaje de error si no se completan los campos
      return;
    }
    setShowConfirmModal(true); // Mostrar confirmación antes de guardar
  };

  // Función para confirmar el guardado de la nota
  const confirmSave = () => {
    const note = {
      id: initialNote?.id || Date.now(),
      title,
      content,
      category: category.trim(),
      tags: tags.trim(),
    }; 

    // Enviar la acción correspondiente al reducer
    if (isEdit) {
      dispatch({ type: 'EDIT_NOTE', payload: note });
    } else {
      dispatch({ type: 'ADD_NOTE', payload: note });
    }

    // Cerrar el modal
    onClose();
    setShowConfirmModal(false);
  };

  // Retornar el componente del modal de agregar/editar nota
  return (
    <div className="addForm">
      <h2>{isEdit ? 'Editar Nota' : 'Agregar Nueva Nota'}</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <label className="addLabel">Titulo: </label>
      <input className="addInput" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <label className="addLabel">Contenido: </label>
      <textarea className="addInput" value={content} onChange={(e) => setContent(e.target.value)} />
      <label className="addLabel">Categoria (Opcional): </label>
      <input className="addInput" type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
      <label className="addLabel">Etiquetas (Opcional): </label>
      <input className="addInput" type="text" value={tags} onChange={(e) => setTags(e.target.value)} />

      <div className="buttonsContainer">
        <button className="guardarButton tooltip" onClick={handleSave}>
          <span className="tooltiptext">Guardar</span>
        </button>
        <button className="cancelarButton tooltip" onClick={onClose}>
          <span className="tooltiptext">Cancelar</span>
        </button>
      </div>

      {/* Modal de confirmación */}
      {showConfirmModal && (
        <ConfirmationModal
          message="¿Estás seguro de que deseas guardar esta nota?"
          onConfirm={confirmSave}
          onCancel={() => setShowConfirmModal(false)}
        />
      )}
    </div>
  );
};

export default AddNoteDialog;