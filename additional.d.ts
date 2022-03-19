// Types

// The base types for folders and notes
type FolderType = {
  [name: string]: string;
};

interface NoteType {
  id: number | null;
  content: string;
  timeCreated: string;
  timeModified: string;
  folderName: string;
}

interface DBNoteType {
  id: number;
  content: string;
  timecreated: string;
  timemodified: string;
  foldername: string;
}

// Found in components/NotesApp.tsx
// This is for the useReducer hook
interface ReducedType {
  selectedFolder: string;
  selectedNote: NoteType;
  folders: FolderType[];
  notes: NoteType[];
  emptyNote: NoteType;
  edited: number[]
}

type ActionType = {
  type: string;
  payload: any;
};

interface UtilityState {
  toggleFolders: boolean;
  deleteNote: boolean;
  toggleNewNote: boolean;
  toggleNewFolder: boolean;
  searchInput: string;
}
