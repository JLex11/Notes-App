export const setUser = (user) => {
  return {type: '@user/SET_USER', payload: user};
};

export const resetUser = () => {
  return { type: '@user/SET_USER', payload: null };
};