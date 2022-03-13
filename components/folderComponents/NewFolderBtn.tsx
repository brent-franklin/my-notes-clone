import styles from '@/styles/folderStyles/NewFolderBtn.module.css';
import Image from 'next/image'

const NewFolderBtn = (): JSX.Element => {
  return (
      <button className={styles.newFolderBtn}>
	  <Image src="/plus-folder.svg" width="20px" height="20px"/>
	  <span>New Folder</span>
      </button>
  );
};

export default NewFolderBtn;
