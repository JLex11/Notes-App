import { motion } from 'framer-motion';
import { memo } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { resetNotification } from '../redux/actions/notificationsActions';

const Notification = () => {
  const dispatch = useDispatch();
  const {message} = useSelector(state => state.notification);

  const colors = {
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

  if (message) {
    setTimeout(() => {
      dispatch(resetNotification());
    }, 3000);
  }

  const { background, color, icon } = colors[message?.type] || colors.default;
  const style = { background, color };

  const motionInitial = {
    opacity: 0,
    x: -100,
    scaleX: 0.6
  };

  const motionAnimate = {
    opacity: 1,
    x: 0,
    scaleX: 1,
    transition: {
      type: 'spring'
    }
  };

  return (
    <>
      {message && (
        <motion.div
          initial={motionInitial}
          animate={motionAnimate}
          className='Notification'
          style={style}>
          <p>{message?.msg}</p>
          {icon === ''
            ? null
            : <span className="material-symbols-outlined">{icon}</span>}
          {message?.type === 'loading'
            && <TailSpin color='white' height={25} width={30} />
          }
        </motion.div>
      )}
    </>
  );
};

export default memo(Notification);