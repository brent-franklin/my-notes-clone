import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { noteHelper } from 'db/helpers.db';
import Head from 'next/head';

// Components found in :rootDir/components
import UtilityBar from '@/components/UtilityBar';
import NotesApp from '@/components/NotesApp';

// UtilityBar Context
import { UtilityProvider } from '../lib/utilityContext';

const Home: NextPage<{ folders: FolderType[]; notes: NoteType[] }> = ({
  folders,
  notes,
}: {
  folders: FolderType[];
  notes: NoteType[];
}) => (
  <div>
    <Head>
      <title>My Notes Clone</title>
      <meta name="description" content="MacOS Notes Clone" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <UtilityProvider>
      <UtilityBar />
      <NotesApp folders={[...folders]} notes={[...notes]} />
    </UtilityProvider>
  </div>
);


// This function is removed after initially run
// It returns the initial props for the app so
// it speeds up initial start by grabbing values beforehand
// in this case it is grabbing the notes and folders currently in the DB
export const getServerSideProps: GetServerSideProps = async (
  _context: GetServerSidePropsContext
) => {
  const folderRes: Response = await fetch(`${process.env.NOTES_URL}/api/folders` as string);
  const folders = await folderRes.json().then((folder) => folder.folders);
  const notesRes: Response = await fetch(`${process.env.NOTES_URL}/api/notes` as string);
  const n = await notesRes.json().then((note) => note.notes);
  const notes = noteHelper(n);

  return {
    props: { folders, notes }, // will be passed to the page component as props
  };
};

export default Home;
