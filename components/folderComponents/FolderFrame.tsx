import styles from '@/styles/Frame.module.css';
import Folder from './Folder';
import { FolderType } from '../../pages/index';
import NewFolderBtn from './NewFolderBtn';

const FolderFrame = ({ section, folders }: { section: string, folders: FolderType[] }): JSX.Element => {
  return (
    <section id={styles[section]} className={styles.frame}>
        <h1>iCloud</h1>
	{folders.map((n: FolderType) => (
            <Folder key={n.name} folderName={n.name} />
          ))}
        <NewFolderBtn />
    </section>
  );
};

export default FolderFrame;
