import styles from '@/styles/Frame.module.css';

const Frame = ({ section, children }: { section: string, children: React.ReactNode }): JSX.Element => {
  return (
    <section id={styles[section]} className={styles.frame}>
	{children ?? children}
    </section>
  );
};

export default Frame;
