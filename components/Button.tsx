import { Dispatch, SetStateAction, useContext } from 'react';
import styles from '@/styles/Button.module.css';
import { UtilityContext } from '@/lib/utilityContext';
import { altText } from './UtilityBar';
import Image from 'next/image';

const Button = ({ src, alt }: { src: string; alt: string }): JSX.Element => {
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

  // This seciton adds the utility to the utilitybar
  // Since all of the values are boolean it inverts
  // their value depending on which button is clicks
  const handleClick = () => {
    switch (alt) {
      case altText[0]:
        const toggleFolders: UtilityState = {...utilities, toggleFolders: !utilities.toggleFolders };
        return setUtilities(toggleFolders);
      case altText[1]:
        const deleteNote: UtilityState = { ...utilities, deleteNote: !utilities.deleteNote };
        return setUtilities(deleteNote);
      case altText[2]:
        const toggleNewNote: UtilityState = { ...utilities, toggleNewNote: !utilities.toggleNewNote };
        return setUtilities(toggleNewNote);
      default:
        return null;
    }
  };
  return (
    <button className={styles.btn} onClick={handleClick}>
      <Image src={src} width="20px" height="20px" alt={alt} />
    </button>
  );
};

export default Button;
