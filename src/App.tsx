import { useState } from 'react';
import AppBar from './componentes/AppBar'; // Importar componente AppBar
import NotePanel from './componentes/NotePanel'; // Importar componente NotePanel
import AddNoteButton from './componentes/AddNoteButton'; // Importar componente AddNoteButton
import AddNoteDialog from './componentes/AddNote'; // Importar componente AddNoteDialog
import { NoteProvider } from './context/NoteContext'; // Importar el provider del contexto

const App = () => {
  const [showAddNote, setShowAddNote] = useState(false); 

  const toggleAddNoteDialog = () => {
    setShowAddNote(!showAddNote);
  };

  return (
    <div>
      <NoteProvider>
        <div className='paginaPrincipal'>
          <AppBar />
          <div className='addNoteContainer'>
            <div className='buttonContainer'>
             <AddNoteButton onClick={toggleAddNoteDialog} />
            </div>
            {showAddNote && <AddNoteDialog onClose={toggleAddNoteDialog} />}
         </div>
         <div>
           <NotePanel />
          </div>
       </div>
      </NoteProvider>
    </div>
  );
};

export default App;