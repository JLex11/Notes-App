import { motion } from 'framer-motion';
import { memo, useCallback, useState } from 'react';
import LoginForm from './components/LoginForm';
import WelcomeMessage from './components/WelcomeMessage';
import styles from './styles/Welcome.module.css';

const Welcome = () => {
  const [goStarted, setgoStarted] = useState(false);
  
  const handleGoStarted = useCallback((e) => {
    e.preventDefault();
    setgoStarted(true);
  }, []);

  console.log('goStarted', goStarted);

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

  return (
    <>
      {goStarted === false ? (
        <div className={styles.ContainerWelcome}>
          <motion.div
            initial={motionInital}
            animate={motionIn}
            exit={motionOut}
            className={styles.Welcome}>
            <WelcomeMessage />
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
      ) : (<LoginForm />)}
    </>
  );
};

export default memo(Welcome);