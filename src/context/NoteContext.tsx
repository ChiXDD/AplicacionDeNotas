// NoteContext.tsx
import React, { createContext, useReducer, ReactNode } from 'react';

// Definir el contenido de las notas
type Note = {
  id: number;
  title: string;
  content: string;
  category?: string;
  tags?: string;
};

// Definir el estado de las notas
type NoteState = {
  notes: Note[];
};

// Definir las acciones que se pueden realizar
type Action =
  | { type: 'ADD_NOTE'; payload: Note } // Agregar nota
  | { type: 'REMOVE_NOTE'; payload: number } // Eliminar nota
  | { type: 'EDIT_NOTE'; payload: Note }; // Editar nota

const initialState: NoteState = {
  notes: [],
};

// Crear el contexto de las notas
const NoteContext = createContext<{
  state: NoteState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

// Crear el reductor de las notas
const noteReducer = (state: NoteState, action: Action): NoteState => {
  switch (action.type) {
    case 'ADD_NOTE':
      return { ...state, notes: [...state.notes, action.payload] };
    case 'REMOVE_NOTE':
      return {
        ...state,
        notes: state.notes.filter(note => note.id !== action.payload),
      };
    case 'EDIT_NOTE':
      return {
        ...state,
        notes: state.notes.map(note =>
          note.id === action.payload.id ? { ...note, ...action.payload } : note
        ),
      };
    default:
      return state;
  }
};

// Crear el proveedor de las notas
export const NoteProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(noteReducer, initialState);

  return (
    <NoteContext.Provider value={{ state, dispatch }}>
      {children}
    </NoteContext.Provider>
  );
};

export default NoteContext;