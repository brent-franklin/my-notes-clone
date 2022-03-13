import styles from '@/styles/Button.module.css';
import Image from 'next/image'

const Button = ({src}: {src: string}): JSX.Element => {
  return (
      <button className={styles.btn}>
	  <Image src={src} width="20px" height="20px"/>
      </button>
  );
};

export default Button;
