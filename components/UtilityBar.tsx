import styles from '@/styles/UtilityBar.module.css';
import Button from './Button';

const imgUrls: string[] = [
    '/side-bar-toggle.svg',
    '/trash.svg',
    '/new-note.svg'
];

const UtilityBar = (): JSX.Element => {
    return (
	<section id={styles.utilityBar}>
	    {imgUrls.map(n => <Button key={n} src={n} />)}
	</section>
  );
};

export default UtilityBar;
