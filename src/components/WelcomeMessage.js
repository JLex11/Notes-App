import { memo } from 'react';
import { useTypewriter } from 'react-simple-typewriter';
import styles from '../styles/Welcome.module.css';

const WelcomeMessage = ({cursor}) => {

  const typeWords = [' to your Notes App', ' to your best tool', ' to your best ally'];

  const { text } = useTypewriter({
    words: typeWords,
    loop: 0,
    delay: 1000,
    cursor : '_',
    typeSpeed: 70,
    deleteSpeed: 50,
    delaySpeed: 1400,
  });

  return (
    <>
      <h1>Welcome
        {text}
        <span className={styles.cursor}>|</span>
      </h1>
      <p>
        This is a simple React-Redux app that allows you to
        create, edit, and delete notes.
        <br /><br />
        To get started, click the button below to create a new
        note.
      </p>
    </>
  );
};

export default memo(WelcomeMessage);