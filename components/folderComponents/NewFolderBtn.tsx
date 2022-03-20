import { Dispatch, SetStateAction, useContext } from 'react';
import styles from '@/styles/folderStyles/NewFolderBtn.module.css';
import { UtilityContext } from '@/lib/utilityContext';
import Image from 'next/image';

const NewFolderBtn = (): JSX.Element => {
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

  // This event handlder changes the styling of the
  // new folder input to show when button is clicked
  const handleToggleFolder = (evt: React.MouseEvent): void => {
    evt.preventDefault();
    setUtilities({ ...utilities, toggleNewFolder: !utilities.toggleNewFolder });
  };

  return (
    <button className={styles.newFolderBtn} onClick={handleToggleFolder}>
      <Image src="/plus-folder.svg" width="20px" height="20px" alt="New Folder Icon" />
      <span>New Folder</span>
    </button>
  );
};

export default NewFolderBtn;
