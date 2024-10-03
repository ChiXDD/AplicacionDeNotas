import { useContext, useState } from 'react';
import NoteContext from '../context/NoteContext'; // Importa el contexto de las notas
import Draggable from 'react-draggable'; // Importa react-draggable
import AddNoteDialog from './AddNote'; // Componente para agregar/editar notas
import ConfirmationModal from './ConfirmationModal'; // Componente de confirmación

// Colores de las notas
const noteColor = ['#FFD09B', '#B7B7B7', '#CDC1FF', '#BB9AB1', '#A6B37D', '#F1D3CE'];

const NotePanel = () => {
  const { state, dispatch } = useContext(NoteContext); // Obtiene el estado y el dispatch del contexto
  const [hoveredNoteId, setHoveredNoteId] = useState<number | null>(null); // Para mostrar botones al hacer hover
  const [editNote, setEditNote] = useState<null | any>(null); // Para editar nota
  const [selectedNote, setSelectedNote] = useState<null | { note: any; color: string }>(null); // Para mostrar detalles
  const [showConfirmModal, setShowConfirmModal] = useState(false); // Mostrar modal de confirmación
  const [pendingAction, setPendingAction] = useState<null | (() => void)>(null); // Acción pendiente a confirmar

  // Función para eliminar nota
  const handleDelete = (id: number) => {
    setPendingAction(() => () => dispatch({ type: 'REMOVE_NOTE', payload: id }));
    setShowConfirmModal(true);
  };

  // Función para abrir modal de edición
  const handleEdit = (note: any) => {
    setEditNote(note);
  };

  // Confirmar y ejecutar la acción pendiente (eliminar o editar)
  const confirmAction = () => {
    if (pendingAction) pendingAction();
    setShowConfirmModal(false);
    setPendingAction(null);
  };

  // Cancelar la acción
  const cancelAction = () => {
    setShowConfirmModal(false);
    setPendingAction(null);
  };

  // Función para abrir modal de detalles de la nota cuando se presiona el botón "Mostrar detalles"
  const handleShowDetails = (note: any, color: string) => {
    setSelectedNote({ note, color });
  };

  // Función para cerrar modal de detalles
  const closeDetailsModal = () => {
    setSelectedNote(null);
  };

  // Renderizar las notas
  return (
    <div className='panelNotas'>
      {state.notes.length === 0 ? (
        <p className='textoVacio'>Parece que no hay notas que mostrar :(</p>
      ) : (
        state.notes.map((note, index) => {
          const backgroundColor = noteColor[index % noteColor.length]; // Asignar color a la nota
          return (
            <Draggable key={note.id}> {/* Draggable permite el 'Drag&Drop' */}
              <div className='notaContainer' onMouseEnter={() => setHoveredNoteId(note.id)} onMouseLeave={() => setHoveredNoteId(null)} style={{ position: 'relative', cursor: 'pointer' }}>
                {hoveredNoteId === note.id && (
                  <div className='notaButtons'>
                    <button className='editarButton tooltip' onClick={(e) => { e.stopPropagation(); handleEdit(note); }}>
                      <span className='tooltiptext'>Editar</span>
                    </button>
                    <button className='eliminarButton tooltip' onClick={(e) => { e.stopPropagation(); handleDelete(note.id); }}>
                      <span className='tooltiptext'>Eliminar</span>
                    </button>
                    <button className='mostrarDetallesButton tooltip' onClick={(e) => { e.stopPropagation(); handleShowDetails(note, backgroundColor); }}>
                      <span className='tooltiptext'>Mostrar Detalles</span>
                    </button>
                  </div>
                )}

                <div className='notas' style={{ backgroundColor }}>
                  {note.category && <p>Categoria: {note.category}</p>}
                  {note.tags && <p>Etiquetas: {note.tags}</p>}
                  <p>{note.content}</p>
                </div>
                <h3>{note.title}</h3>
              </div>
            </Draggable>
          );
        })
      )}

      {/* Editar nota */}
      {editNote && (
        <AddNoteDialog
          onClose={() => setEditNote(null)}
          initialNote={editNote} // Pasa la nota a editar
          isEdit={true}
        />
      )}

      {/* Modal de detalles */}
      {selectedNote && (
        <div className="modalBackground" onClick={closeDetailsModal}>
          <div className="noteDetailsModal" style={{ backgroundColor: selectedNote.color }} onClick={(e) => e.stopPropagation()}>
            <h2>{selectedNote.note.title}</h2>
            <p><strong>Contenido:</strong> {selectedNote.note.content}</p>
            {selectedNote.note.category && <p><strong>Categoria:</strong> {selectedNote.note.category}</p>}
            {selectedNote.note.tags && <p><strong>Etiquetas:</strong> {selectedNote.note.tags}</p>}
            <div className='closeButtonContainer'>
              <button className="closeButton tooltip" onClick={closeDetailsModal}>
                <span className="tooltiptext">Cerrar</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmación */}
      {showConfirmModal && (
        <ConfirmationModal
          message="¿Estás seguro de que deseas realizar esta acción?"
          onConfirm={confirmAction}
          onCancel={cancelAction}
        />
      )}
    </div>
  );
};

export default NotePanel;