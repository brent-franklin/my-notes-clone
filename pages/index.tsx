import type { GetStaticProps, GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import Head from 'next/head';

// Components found in :rootDir/components
import UtilityBar from '@/components/UtilityBar';
import NotesApp from '@/components/NotesApp';
import Folder from '@/components/folderComponents/Folder';

// Stylesheets found in :rootDir/styles
import styles from '@/styles/Home.module.css';

export type FolderType = {
  [name: string]: string;
};

export type NoteType = {
  [name: string]: string;
};

const Home: NextPage = ({ folders, notes }: { folders: FolderType[]; notes: NoteType[] }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>My Notes Clone</title>
        <meta name="description" content="MacOS Notes Clone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
	  <UtilityBar />
	  <NotesApp folders={[...folders]} notes={[...notes]}/>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext): GetStaticPropsResult<P> => {
  const folderRes: Response = await fetch(process.env.FOLDERS_URL);
  const folders = await folderRes.json().then((folder) => folder.folders);
  const notesRes: Response = await fetch(process.env.NOTES_URL);
  const notes = await notesRes.json().then((note) => note.notes);
  return {
    props: { folders, notes }, // will be passed to the page component as props
  };
};

export default Home;
