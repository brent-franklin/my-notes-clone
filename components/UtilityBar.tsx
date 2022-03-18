import styles from '@/styles/UtilityBar.module.css';
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
  return (
    <section id={styles.utilityBar}>
      {imgUrls.map((n: string, i: number) => (
        <Button key={n} src={n} alt={altText[i]} />
      ))}
    </section>
  );
};

export default UtilityBar;
