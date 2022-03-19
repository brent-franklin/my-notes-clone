import { newFolderDB } from '@/db/helpers.db';
import styles from '@/styles/folderStyles/NewFolderPopup.module.css';
import { ACTION } from 'lib/reducer';
import { UtilityContext } from 'lib/utilityContext';
import { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from 'react';

const NewFolderPopup = ({ dispatch }: { dispatch: Dispatch<ActionType> }): JSX.Element => {
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

  // This hook manages the input value of the new folder input
  const [input, setInput] = useState('');

  // This resets the input value as the user is typing in the new folder input
  const handleInput = (evt: React.ChangeEvent) => {
    evt.preventDefault();
    setInput((evt.target as HTMLInputElement).value);
  };

  // This seciton allows the user to take the input and create and
  // new folder based on the name typed into the input
  // the input is passed to the newFolderDB function to send and
  // post to the database then the return value of that is
  // passed to the dispatch reducer function to update the UI
  // Shift + Enter is how the user saves the folder to the DB
  const handleCreateFolder = async (evt: React.KeyboardEvent) => {
    if (evt.shiftKey && evt.key === 'Enter') {
      evt.preventDefault();
      const newFolder: FolderType[] = await newFolderDB(input);
      dispatch({ type: ACTION.CREATE_FOLDER, payload: newFolder });
      (evt.target as HTMLInputElement).value = '';
    }
  };

  // This section autofocuses the user to the new folder input
  // when the button is clicked so the user can start typing immediately
  const toggleFolder = utilities.toggleNewFolder ? styles.show : styles.hide;
  const autoFocusInput = useRef(null);
  useEffect(() => {
    // reset the value whenever the input shows on the screen
    setInput('');
    // This focuses the usor to the end of the input
    (autoFocusInput?.current as unknown as HTMLTextAreaElement)?.setSelectionRange(-1, -1);
    // this focuses the user
    (autoFocusInput?.current as unknown as HTMLTextAreaElement)?.focus();
  }, [utilities.toggleNewFolder]);

  return (
    <aside className={`${styles.newFolderPopup} ${toggleFolder}`}>
      <input
        ref={autoFocusInput}
      placeholder="New Folder"
        onChange={handleInput}
        onKeyDown={handleCreateFolder}
        value={input}
      />
    </aside>
  );
};

export default NewFolderPopup;
