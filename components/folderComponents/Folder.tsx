import styles from '@/styles/folderStyles/Folder.module.css';

const Folder = ({ folderName }: {folderName: string}): JSX.Element => {
  return (
      <article className={styles.folder}>{folderName}</article>
  );
};

export default Folder;
