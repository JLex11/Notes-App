export const setDropdown = (ref) => {
  return {
    type: '@dropdown/SET_DROPDOWN',
    payload: { ref }
  };
};

export const resetDropdown = () => {
  return { type: '@dropdown/RESET_DROPDOWN', payload: false };
};