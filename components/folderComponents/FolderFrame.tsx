import { Dispatch, SetStateAction, useContext } from 'react';
import styles from '@/styles/Frame.module.css';
import folder from '@/styles/folderStyles/Folder.module.css';
import { ACTION } from '@/lib/reducer';
import { UtilityContext } from '@/lib/utilityContext';
import { ReducerContext } from '@/components/NotesApp';
import NewFolderPopup from './NewFolderPopup';
import NewFolderBtn from './NewFolderBtn';

const FolderFrame = ({
  section,
  dispatch,
}: {
  section: string;
  dispatch: Dispatch<ActionType>;
}): JSX.Element => {

  // This section allows access to the reducer variables
  // folders = FolderType[] | selectedFolder = folder.name
  const reducedContext = useContext(ReducerContext);
  const { folders, selectedFolder } = reducedContext as ReducedType;

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

  // This is the event handler that takes the new folder name
  // and passes the value of the input to the dispatch reducer function
  const handleSelectedFolder = (evt: React.MouseEvent): void => {
    evt.preventDefault();
    const newFolder: string = (evt.target as HTMLParagraphElement).innerText;
    dispatch({ type: ACTION.CHANGE_SELECTED_FOLDER, payload: { newFolder } });
  };

  // If utilities.toggleFolders is false then hide the folder panel
  const toggle: string | undefined = !utilities.toggleFolders ? styles.hidden : undefined;

  return (
    <section id={toggle} className={`${styles[section]} ${styles.frame}`}>
      <h1>iCloud</h1>
      <ul>
        {folders.map((f: FolderType) => (
          <li
            key={f.name}
            className={`${folder.folder} ${f.name === selectedFolder ? folder.selected : null}`}
            onClick={handleSelectedFolder}
          >
            {f.name}
          </li>
        ))}
      </ul>
      <NewFolderPopup dispatch={dispatch} />
      <NewFolderBtn />
    </section>
  );
};

export default FolderFrame;
