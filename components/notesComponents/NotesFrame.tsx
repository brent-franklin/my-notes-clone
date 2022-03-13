import styles from '@/styles/Frame.module.css';
import { NoteType } from '../../pages/index';
import NoteCard from './NoteCard';

const NotesFrame = ({ section, notes }: { section: string, notes: NoteType[] }): JSX.Element => {
  return (
    <section id={styles[section]} className={styles.frame}>
	{notes.map((n: NoteType) => (
          <NoteCard key={n.timecreated} msg={n} />
        ))}
    </section>
  );
};

export default NotesFrame;
