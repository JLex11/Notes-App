import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTypewriter } from 'react-simple-typewriter';
import { App } from './components/App';
import { useNotes } from './hooks/useNotes';
import styles from './styles/Welcome.module.css';

export const Welcome = () => {
  const notes = useNotes();

  const [goStarted, setgoStarted] = useState(
    localStorage.getItem('goStarted')
  );
  const [waitForReady, setWaitForReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      notes.init();
      setWaitForReady(true);
    }, 1000);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleGoStarted = (e) => {
    e.preventDefault();
    setgoStarted(true);
    localStorage.setItem('goStarted', 'true');
  };

  const motionInital = {
    opacity: 0,
    scale: 0.7,
  };

  const motionIn = {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 10,
      stiffness: 100,
      duration: 0.5,
    },
  };
  
  const motionOut = {
    opacity: 0,
    scale: 0.5,
  };

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
      {goStarted ? (
        <App />
      ) : (
        <AnimatePresence>
          <div className={styles.ContainerWelcome}>
            <motion.div
              initial={motionInital}
              animate={motionIn}
              exit={motionOut}
              className={styles.Welcome}>
              <h1>Welcome {waitForReady ? text : 'to your Notes App'}
                <span className={styles.cursor}>|</span>
              </h1>
              <p>
            This is a simple React-Redux app that allows you to
            create, edit, and delete notes.
              </p>
              <p>
            To get started, click the button below to create a new
            note.
              </p>
              <motion.a
                whileHover={{ scale: 1.1, rotate: 30 }}
                href='#Notes'
                onClick={handleGoStarted}>
                <span className='material-symbols-outlined'>
              arrow_forward
                </span>
              </motion.a>
            </motion.div>
          </div>
        </AnimatePresence>
      )}
    </>
  );
};
