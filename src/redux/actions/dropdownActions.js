export const setDropdown = () => {
  return { type: '@dropdown/SET_DROPDOWN', payload: true };
};

export const resetDropdown = () => {
  return { type: '@dropdown/RESET_DROPDOWN', payload: false };
};