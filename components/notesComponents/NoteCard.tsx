import styles from '@/styles/noteStyles/NoteCard.module.css';
import Image from 'next/image';

interface Msg {
  id: string;
  content: string;
  timecreated: string;
  timemodified: string;
  foldername: string;
}

const MsgCard = ({ msg }: { msg: Msg }): JSX.Element => {
  const timeModified: string = new Date(msg.timemodified).toLocaleDateString();
  const [header, ...body]: string[] = msg.content.split(/\n/);
  return (
      <article className={styles.noteCard}>
      <h2>{header}</h2>
      <div>
        <time>{timeModified}</time>
        <p>{body}</p>
      </div>
      <div>
        <Image src="/folder.svg" width="15px" height="15px" />
        <span>{msg.foldername}</span>
      </div>
    </article>
  );
};

export default MsgCard;
