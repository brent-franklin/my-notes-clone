import { UtilityContext } from '@/lib/utilityContext';
import styles from '@/styles/Frame.module.css';
import { Dispatch, SetStateAction, useContext } from 'react';

// This seciton is only used to wrap the TextArea for stying purposes
const Frame = ({ section, children }: { section: string, children: React.ReactNode }): JSX.Element => {

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

  // If utilities.toggleFolders is false then hide the folder panel
  const toggle: string = !utilities.toggleFolders ? styles.frameClose : styles.frameOpen;

  return (
    <section id={styles[section]} className={toggle}>
	{children ?? children}
    </section>
  );
};

export default Frame;
