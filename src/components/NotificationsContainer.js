import { memo } from 'react';
import { useSelector } from 'react-redux';
import styles from '../styles/Notifications.module.css';
import Notification from './Notification';

const NotificationsContainer = () => {
  const notifications = useSelector(state => state.notification);

  return (
    <div className={styles.ContainerNotifications}>
      {notifications.map((notification, index) => (
        <Notification
          key={index}
          message={notification}
          delayTransition={index * 0.1}
        />
      ))}
    </div>
  );
};

export default memo(NotificationsContainer);