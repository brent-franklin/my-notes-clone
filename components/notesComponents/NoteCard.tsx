import { Dispatch, SetStateAction, useContext, useEffect, useRef } from 'react';
import styles from '@/styles/noteStyles/NoteCard.module.css';
import { UtilityContext } from '@/lib/utilityContext';
import { ACTION } from '@/lib/reducer';
import { ReducerContext } from '@/components/NotesApp';
import Image from 'next/image';

const NoteCard = ({
  id,
  note,
  dispatch,
}: {
  id: number;
  note: NoteType;
  dispatch: Dispatch<ActionType>;
}): JSX.Element => {
  // This section allows access to the reducer variables
  // selectedNote = NoteType[]
  const reducedContext = useContext(ReducerContext);
    const { selectedNote, edited, notes } = reducedContext as ReducedType;

  //This seciton allows access to the utilitybar variables
  /*
      {toggleFolders: boolean,
       deleteNote: boolean,
       toggleNewNote: boolean,
       toggleNewFolder: boolean,
       searchInput: string} = utilties
    */
  const utilityContext = useContext(UtilityContext);
  const [utilities, _] = utilityContext as [
    UtilityState,
    Dispatch<SetStateAction<UtilityState>>
  ];

  /* This is to split the content up so that the first new line
   * is seen as the header in the note card if content is empty then
   * return array of empty strings to use in place of content
   */
  const [header, ...body]: string[] =
    note.content === undefined ? ['', ''] : note.content.split(/\n/);

  /* If there is a populated timeModified field then
   * parse into a readable string. If there is not a
   * populated timeModified field then use current time
   */
  const timeModified: string = note.timeModified
    ? new Date(note.timeModified).toLocaleDateString()
    : new Date().toLocaleDateString();

  // () => New Selected Note in HTMLTextArea
  /* This function utilizes the dispatch event from useReducer
   * in order to update which note is in focus in the HTMLTextArea
   */
  const handleSelectedNote = (evt: React.MouseEvent): void => {
    evt.preventDefault();
    // This is the dispatch event from useReducer that was passed down
    dispatch({ type: ACTION.CHANGE_SELECTED_NOTE, payload: { selectedNote: id } });
  };

  // Add style to darken background of selected note
  const select = selectedNote?.id === note.id ? styles.selected : null;
  // If the newNote utility button is pressed then the new note shows in the note section
    const toggleNote = utilities.toggleNewNote && !note.id ? styles.hidden : null;
    const emptyList = notes.length === 0 ? styles.show : null;

  // If the note body is over 50 characters return body else truncate and return with ellipses "..."
  const noteBody = body.join('').length > 65 ? `${body.join('').slice(0, 65)}...` : body.join('');

  // Alert for altered but unsaved notes
  const alert = !edited.includes(note.id as number) ? styles.noAlert : styles.alert;

  return (
    <article
      data-reactid={id}
      data-dbid={note.id}
      className={`${styles.noteCard} ${select} ${toggleNote} ${emptyList}`}
      onClick={handleSelectedNote}
    >
      <h2>{header ? header : 'New Note'}</h2>
      <div>
        <time>{timeModified}</time>
        <p>{noteBody}</p>
      </div>
      <div>
        <Image src="/folder.svg" width="15px" height="15px" alt="Folder Icon" />
        <span>{note.folderName}</span>
      </div>
      <aside className={alert}>Not Saved</aside>
    </article>
  );
};

export default NoteCard;
