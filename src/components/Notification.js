import { AnimatePresence, motion } from 'framer-motion';
import { memo, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { useDispatch } from 'react-redux';
import { resetNotification } from '../redux/actions/notificationsActions';
import styles from '../styles/Notifications.module.css';

const Notification = ({ message, delayTransition }) => {
  const dispatch = useDispatch();
  const { msg, type } = message;
  
  const [exiting, setExiting] = useState(false);

  const nTypes = {
    success: {
      icon: 'done',
      background: 'linear-gradient(to bottom, #2cb710, #29c30a)',
      color: '#fff'
    },
    error: {
      icon: 'error',
      background: 'linear-gradient(to bottom, #f44336, #e63629)',
      color: '#fff'
    },
    warning: {
      icon: 'warning',
      background: 'linear-gradient(to bottom, #ffb515, #e5a211)',
      color: '#fff'
    },
    info: {
      icon: 'info',
      background: 'linear-gradient(to bottom, #008ae6, #0099ff)',
      color: '#fff'
    },
    loading: {
      icon: '',
      background: 'linear-gradient(to bottom, #008ae6, #0099ff)',
      color: '#fff'
    },
    default: {
      icon: 'notifications',
      background: 'linear-gradient(to bottom, #d8d8d8, #c9c9c9)',
      color: '#000'
    }
  };

  setTimeout(() => {
    handleDelete();
  }, 3000);

  const handleDelete = () => {
    setExiting(!exiting);
    !exiting && dispatch(resetNotification(message));
  };

  const { background, color, icon } = nTypes[type] || nTypes.default;
  const style = { background, color };
  
  const motionInitial = {
    opacity: 0,
    x: -100,
    scaleX: 0.3,
  };
  
  const motionAnimate = {
    opacity: 1,
    x: 0,
    scaleX: 1,
    transition: {
      type: 'spring',
      damping: 10,
      stiffness: 100,
      delay: delayTransition
    }
  };

  const motionExit = {
    opacity: 0,
    x: 100,
    scaleX: 0.3
  };

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          initial={motionInitial}
          animate={motionAnimate}
          exit={motionExit}
          className={styles.Notification}
          style={style}
        >
          <p>{msg}</p>
          {icon
            ? <span className='material-symbols-outlined'>{icon}</span>
            : <TailSpin
              width={40}
              height={25}
              color='#fff'
            />
          }
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default memo(Notification);