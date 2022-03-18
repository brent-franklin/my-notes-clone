import styles from '@/styles/Frame.module.css';
import { Dispatch, useContext } from 'react';
import { ReducerContext } from '../NotesApp';
import NoteCard from './NoteCard';

const NotesFrame = ({
  section,
  dispatch,
}: {
  section: string;
  dispatch: Dispatch<ActionType>;
}): JSX.Element => {
  // This section allows access to the reducer variables
  // notes = NoteType[], emptyNote = NoteType[]
  const reducedContext = useContext(ReducerContext);
    const { notes, emptyNote, selectedFolder } = reducedContext as ReducedType;

  // Combine notes and empty note to display on screen together
  const noteList = [emptyNote, ...notes];

  return (
    <section id={styles[section]} className={styles.frame}>
	  {noteList.filter((n:NoteType)=> n.folderName === selectedFolder || n.folderName === "").map((n: NoteType, i: number) => {
        return <NoteCard id={i} key={n.timeCreated ?? 'newNote'} note={n} dispatch={dispatch} />;
      })}
    </section>
  );
};

export default NotesFrame;
