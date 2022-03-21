// Hooks
import {
  useReducer,
  createContext,
  useContext,
  SetStateAction,
  Dispatch,
  useRef,
  useEffect,
  useState,
} from 'react';

// lib
import { ACTION, emptyNote, reducer } from '@/lib/reducer';
import { UtilityContext } from '@/lib/utilityContext';

// Database Helper Functions
import { newNoteDB, updateNoteDB } from 'db/helpers.db';

// Components
import Frame from './Frame';
import FolderFrame from './folderComponents/FolderFrame';
import NotesFrame from './notesComponents/NotesFrame';

// Styles for TextArea
import styles from 'styles/noteStyles/NoteForm.module.css';
import home from 'styles/Home.module.css';

export const ReducerContext = createContext<ReducedType | null>(null);

const NotesApp = ({
  folders,
  notes,
}: {
  folders: FolderType[];
  notes: NoteType[];
}): JSX.Element => {
  //This seciton allows access to the utilitybar variables
  /*
      {toggleFolders: boolean,
       deleteNote: boolean,
       toggleNewNote: boolean,
       toggleNewFolder: boolean,
       searchInput: string} = utilties
    */
  const utilityContext = useContext(UtilityContext);
  const [utilities, setUtilities] = utilityContext as [
    UtilityState,
    Dispatch<SetStateAction<UtilityState>>
  ];

  // The object inside of the useReducer hook that manages state
  const initialState: ReducedType = {
    folders,
    selectedFolder: folders[0].name,
    notes: notes,
    emptyNote: emptyNote,
    selectedNote: notes[0],
    edited: [0],
  };

  // This is the instantiation of the useReducer hook
  // It returns the state variable and dispatch function to uopdate state
  const [state, dispatch] = useReducer(reducer, initialState);
  const selectedNote: NoteType = state.selectedNote ?? state.emptyNote;

  // This hook manages the input value of the TextArea
  const [textAreaState, setTextAreaState] = useState(state.selectedNote?.content);

  useEffect(() => {
    setTextAreaState(state.selectedNote?.content);
  }, [state.selectedNote?.content]);

  // This ref is used to skip the first firing of the useEffect below
  const ref = useRef(false);
  // This hook watches to see if the utility.deleteNote value changes
  // if it changes then it calls the deleteNoteDB function and passes
  // in the selectedNote value. It then passes that return value into
  // the pispatch reducer function to update the UI and delete the note
  useEffect(() => {
    if (ref.current) {
      dispatch({ type: ACTION.DELETE_NOTE, payload: null });
      // If the length of the note list is 1
      // that means there is only an empty not and the
      // TextArea is reset to an empty value
    }
    ref.current = true;
  }, [utilities.deleteNote]);

  // If shift key is not held while the user hits enter then the cursor
  // will return to the line below and the user can structure the notes
  // as they wish. setNoteTextArea watches and updates every key stroke
  // with the useState hook
  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>): void => {
    evt.preventDefault();
    dispatch({
      type: ACTION.READ_NOTE,
      payload: { newContent: evt.target.value, selectedNote },
    });
    setTextAreaState(evt.target.value);
  };

  // If shift key is held down while pressing enter, preventDefault() in
  // Keydown Event then onChange event will not fire and the text is
  // submitted to update the note on the database.
  const handleKeyDown = async (evt: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (evt.shiftKey && evt.key === 'Enter') {
      evt.preventDefault();
      // If the selectedNote.id is null then that means the newNote is selected
      // and instead of updating a note, a new note should be created
      if (selectedNote.id === null) {
        const newNote: NoteType[] = await newNoteDB(textAreaState, state.selectedFolder);
        dispatch({ type: ACTION.CREATE_NOTE, payload: { newNote } });
        setUtilities({ ...utilities, toggleNewNote: true });
      } else {
        const updatedNote: NoteType[] = await updateNoteDB(textAreaState, selectedNote);
        dispatch({ type: ACTION.UPDATE_NOTE, payload: { updatedNote } });
      }
    }
  };

  // Add date to Note TextArea based on selected note or if the emptyNote is selected
  const noteDated: Date = new Date(selectedNote?.timeCreated);
  const noteCreatedAt: string =
    noteDated.toLocaleString() === 'Invalid Date'
      ? `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
      : `${noteDated.toLocaleDateString()} ${noteDated.toLocaleTimeString()}`;

  // This section autofocuses the user to the end of the TextArea when a note is selected
  const autoFocusTextArea = useRef(null);
  useEffect(() => {
    (autoFocusTextArea?.current as unknown as HTMLTextAreaElement)?.setSelectionRange(-1, -1);
    (autoFocusTextArea?.current as unknown as HTMLTextAreaElement)?.focus();
  }, [autoFocusTextArea, textAreaState]);

  const toggleTextArea = !utilities.toggleFolders ? styles.noteFormOpen : styles.noteFormClose;
  const toggleTextAreaHeader = !utilities.toggleFolders
    ? styles.noteHeaderOpen
    : styles.noteHeaderClose;

  return (
    <main id={home.container}>
      <ReducerContext.Provider value={state as ReducedType}>
        <FolderFrame section="folders" dispatch={dispatch} />

        <NotesFrame section="notes" dispatch={dispatch} />

        <Frame section="note">
          <p id={toggleTextAreaHeader}>
            <time>{noteCreatedAt}</time>
            <span>Shift + Enter to Save</span>
          </p>

          <textarea
            id={toggleTextArea}
            placeholder="New Note"
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            value={textAreaState}
            ref={autoFocusTextArea}
          />
        </Frame>
      </ReducerContext.Provider>
    </main>
  );
};

export default NotesApp;
