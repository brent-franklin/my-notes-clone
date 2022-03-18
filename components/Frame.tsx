import styles from '@/styles/Frame.module.css';

// This seciton is only used to wrap the TextArea for stying purposes

const Frame = ({ section, children }: { section: string, children: React.ReactNode }): JSX.Element => {
  return (
    <section id={styles[section]} className={styles.frame}>
	{children ?? children}
    </section>
  );
};

export default Frame;
