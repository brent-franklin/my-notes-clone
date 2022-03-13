// Hooks
import { useState } from 'react';

// Types
import { NoteType } from '../pages/index';
import { FolderType } from '../pages/index';

// Components
import Frame from './Frame';
import FolderFrame from './folderComponents/FolderFrame';
import NotesFrame from './notesComponents/NotesFrame';

// Styles for TextArea
import styles from 'styles/noteStyles/NoteForm.module.css';


const NotesApp = ({
  folders,
  notes,
}: {
  folders: FolderType[];
  notes: NoteType[];
}): JSX.Element => {
  const [noteTextArea, setNoteTextArea] = useState('');
  const [selectedNote, setSelectedNote] = useState(notes[0]);

  const [selectedFolder, setSelectedFolder] = useState(folders[0]);

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>): void => {
    evt.preventDefault();
    setNoteTextArea(evt.target.value);
  };

  const handleKeyDown = (evt: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (evt.shiftKey && evt.key === 'Enter') {
      evt.preventDefault();
      console.log(noteTextArea);
    }
  };

  return (
    <>
      <FolderFrame section="folders" folders={folders} />
      <NotesFrame section="notes" notes={notes} />

      <Frame section="message">
        <textarea
          id={styles.noteForm}
          placeholder="New Note"
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          value={noteTextArea}
        />
      </Frame>
    </>
  );
};

export default NotesApp;
