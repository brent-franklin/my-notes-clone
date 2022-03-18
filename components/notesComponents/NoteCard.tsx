import styles from '@/styles/noteStyles/NoteCard.module.css';
import { UtilityContext } from 'lib/utilityContext';
import Image from 'next/image';
import { Dispatch, SetStateAction, useContext, useEffect, useRef } from 'react';
import { ACTION } from '../../lib/reducer';
import { ReducerContext } from '../NotesApp';

const NoteCard = ({
  id,
  note,
  dispatch,
}: {
  id: number;
  note: NoteType;
  dispatch: Dispatch<ActionType>;
}): JSX.Element => {
  const reducedContext = useContext(ReducerContext);
  const { selectedNote } = reducedContext as ReducedType;

  const utilityContext = useContext(UtilityContext);
  const [utilities, _] = utilityContext as [UtilityState, Dispatch<SetStateAction<UtilityState>>];

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

  // This ref is used to skip the first useEffect hook firing event
  const toggleFocus = useRef(false);
  useEffect(() => {
    // if the ref.current is true then change focus to new note
    // if toggle is off then change selected note to most recent note
    if (toggleFocus.current) {
      const selectNote = utilities.toggleNewNote ? 1 : id;
      dispatch({ type: ACTION.CHANGE_SELECTED_NOTE, payload: { selectedNote: selectNote } });
    }
    // this allows the useEffect to fire after skipping the first firing event
    toggleFocus.current = true;
  }, [toggleNote]);

  return (
    <article
      data-reactid={id}
      data-dbid={note.id}
      className={`${styles.noteCard} ${select} ${toggleNote}`}
      onClick={handleSelectedNote}
    >
      <h2>{header ? header : 'New Note'}</h2>
      <div>
        <time>{timeModified}</time>
        <p>{body}</p>
      </div>
      <div>
        <Image src="/folder.svg" width="15px" height="15px" alt="Folder Icon" />
        <span>{note.folderName}</span>
      </div>
    </article>
  );
};

export default NoteCard;
