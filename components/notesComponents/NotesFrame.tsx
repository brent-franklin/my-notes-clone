import styles from '@/styles/Frame.module.css';
import fuzzySearch from 'lib/fuzzySearch';
import { UtilityContext } from 'lib/utilityContext';
import { Dispatch, SetStateAction, useCallback, useContext, useEffect } from 'react';
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
  //This seciton allows access to the utilitybar variables
  /*
      {toggleFolders: boolean,
       deleteNote: boolean,
       toggleNewNote: boolean,
       toggleNewFolder: boolean,
       searchInput: string} = utilties
    */
  const utilityContext = useContext(UtilityContext);
  const [utilities, _] = utilityContext as [UtilityState, Dispatch<SetStateAction<UtilityState>>];

  const searchNotes = useCallback(() => {
    return notes.filter((n: NoteType) => {
      if (fuzzySearch(utilities.searchInput, n)) return n;
    });
  }, [utilities.searchInput, notes]);
  // Combine searchedNotes and empty note to display on screen together
  const mainNoteList = [emptyNote, ...searchNotes()];

  return (
    <section id={styles[section]} className={styles.frame}>
      {mainNoteList
        .filter((n: NoteType) => n.folderName === selectedFolder || n.folderName === '')
        .map((n: NoteType, i: number) => {
          return (
            <NoteCard
              id={i}
              key={n.timeCreated ?? 'newNote'}
              note={n}
              dispatch={dispatch}
            />
          );
        })}
    </section>
  );
};

export default NotesFrame;
