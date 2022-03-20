import { Dispatch, SetStateAction, useContext } from 'react';
import styles from '@/styles/UtilityBar.module.css';
import { UtilityContext } from '@/lib/utilityContext';
import Button from './Button';

// All of the SVG's used for the utilitybar buttons
const imgUrls: string[] = ['/side-bar-toggle.svg', '/trash.svg', '/new-note.svg'];

// Alt text for SVG's
export const altText: string[] = [
  'Toggle Folder Icon',
  'Delete Selected Note Icon',
  'Toggle New Note Icon',
];
const UtilityBar = (): JSX.Element => {
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

  return (
    <section id={styles.utilityBar}>
      <ul id={styles.colorContainer}>
        {['red', 'yellow', 'green'].map((color: string) => (
          <li id={styles[color]} key={color}>
            <button className={styles.btn}></button>
          </li>
        ))}
      </ul>
      <ul id={styles.utilityContainer}>
        {imgUrls.map((n: string, i: number) => (
          <li key={n}>
            <Button src={n} alt={altText[i]} />
          </li>
        ))}
      </ul>
      <input
        id={styles.search}
        type="search"
        placeholder="Search Notes"
	value={utilities.searchInput}
        onChange={(e) => setUtilities({ ...utilities, searchInput: e.target.value })}
      />
    </section>
  );
};

export default UtilityBar;
