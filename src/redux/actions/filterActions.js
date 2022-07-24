export const selectedFilter = (filter) => {
  return async (dispatch) => {
    dispatch({
      type: '@filter/SET_FILTER',
      payload: {
        selected: filter
      }
    });
  };
};