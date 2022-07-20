export const setNotification = (notification) => {
  return { type: '@notifications/SET_MESSAGE', payload: notification };
};

export const resetNotification = () => {
  return { type: '@notifications/RESET_MESSAGE', payload: false };
};