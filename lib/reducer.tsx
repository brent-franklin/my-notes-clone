// These are all of the decided actions available in the useReducer hook
export const ACTION = {
  CREATE_NOTE: 'CREATE_NOTE',
  READ_NOTE: 'READ_NOTE',
  UPDATE_NOTE: 'UPDATE_NOTE',
  DELETE_NOTE: 'DELETE_NOTE',
  CREATE_FOLDER: 'CREATE_FOLDER',
  CHANGE_SELECTED_FOLDER: 'CHANGE_SELECTED_FOLDER',
  CHANGE_SELECTED_NOTE: 'CHANGE_SELECTED_NOTE',
};

// Empty Note Object
export const emptyNote: NoteType = {
  id: null,
  content: '',
  timeCreated: '',
  timeModified: '',
  folderName: '',
};

// This function handles the state of the application
// All dispatch function calls are handled here
export const reducer = (state: ReducedType, action: ActionType): ReducedType => {
  // Destructure type and payload for easier use
  const { type, payload } = action;
  switch (type) {
    // Change selected folder and selected note depending on payload
    case ACTION.CHANGE_SELECTED_FOLDER:
      const folderSelectNote = state.notes.filter(
        (n: NoteType) => n.folderName === payload.newFolder
      );
      return { ...state, selectedFolder: payload.newFolder, selectedNote: folderSelectNote[0] };
    // Add the folder from that was already added to DB
    case ACTION.CREATE_FOLDER:
      return { ...state, folders: payload.newFolder };
    // Change selected note depending on payload
    case ACTION.CHANGE_SELECTED_NOTE:
      const note = state.notes[payload.selectedNote - 1];
      const newNote = note === undefined ? state.emptyNote : note;
      return { ...state, selectedNote: newNote };
    // This allows the noteCard to update with the TextArea as the user types
    case ACTION.READ_NOTE:
      // This is if the selected note is the empty note
      if (payload.selectedNote.id < 1) {
        const newNote = { ...state.emptyNote, content: payload.newContent };
        return { ...state, emptyNote: newNote };
      }
      // This is if the note is not the empty note
      const newNoteList = state.notes.map((n) => {
        return n.id === payload.selectedNote.id ? { ...n, content: payload.newContent } : n;
      });
      return { ...state, notes: newNoteList };
    // Add the new note to the list of notes that was already added to DB
    case ACTION.CREATE_NOTE:
      const newNotes = payload.newNote.concat(state.notes);
      return { ...state, notes: newNotes, emptyNote: emptyNote, selectedNote: payload.newNote[0] };
    // Filter out the note that matches the updated note.id
    // Then replace it with the updated note
    case ACTION.UPDATE_NOTE:
      const filteredNoteList = state.notes.filter((n) => n.id !== payload.updatedNote[0].id);
      const updatedNoteList = [payload.updatedNote[0], ...filteredNoteList];
      return { ...state, notes: updatedNoteList };
    // Filter out the note that was deleted from DB and return notes
    case ACTION.DELETE_NOTE:
      const deletedNoteList = state.notes.filter((n) => n.id !== state.selectedNote.id);
      return { ...state, notes: deletedNoteList, selectedNote: deletedNoteList[0] };
    default:
      return state;
  }
};
