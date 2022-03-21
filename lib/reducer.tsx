import { deleteNoteDB, newNoteDB } from '@/db/helpers.db';

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
      const changedNote = note === undefined ? state.emptyNote : note;
      return { ...state, selectedNote: changedNote };

    // This allows the noteCard to update with the TextArea as the user types
    case ACTION.READ_NOTE:
      const id = payload.selectedNote.id;
      const newContent = payload.newContent;
      // This is if the selected note is the empty note
      if (id < 1) {
        const newNote = { ...state.emptyNote, content: newContent };
        return { ...state, emptyNote: newNote };
      }
      // This is if the note is not the empty note
      const newNoteList = state.notes.map((n) => {
        return n.id === id ? { ...n, content: newContent } : n;
      });
      const addEdited = state.edited.includes(id) ? state.edited : [...state.edited, id];
      return { ...state, notes: newNoteList, edited: addEdited };

    // Add the new note to the list of notes that was already added to DB
    case ACTION.CREATE_NOTE:
      const newNote = payload.newNote[0];
      const newNotes = payload.newNote.concat(state.notes);
      return { ...state, notes: newNotes, emptyNote: emptyNote, selectedNote: newNote };

    // Filter out the note that matches the updated note.id
    // Then replace it with the updated note
    case ACTION.UPDATE_NOTE:
      const updatedNote = payload.updatedNote[0];
      const filteredNoteList = state.notes.filter((n) => n.id !== updatedNote.id);
      const updatedNoteList = [updatedNote, ...filteredNoteList];
      const newEdited = state.edited.filter((e) => e !== updatedNote.id);
      return {
        ...state,
        notes: updatedNoteList,
        edited: newEdited,
      };

    // Filter out the note that was deleted from DB and return notes
    case ACTION.DELETE_NOTE:
      const deleteNote = async () => await deleteNoteDB(state.selectedNote);
      deleteNote();
      if (state.selectedNote.id !== null) {
        const deletedNoteList = state.notes.filter((n) => n.id !== state.selectedNote.id);
        const selectedAfterDelete = !deletedNoteList.length ? state.emptyNote : deletedNoteList[0];
        return { ...state, notes: deletedNoteList, selectedNote: selectedAfterDelete };
      } else {
        return { ...state, selectedNote: emptyNote };
      }

    default:
      return state;
  }
};
