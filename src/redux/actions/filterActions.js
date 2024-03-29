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

export const orderFilter = (order) => {
  return async (dispatch) => {
    dispatch({
      type: '@filter/SET_ORDER',
      payload: { order }
    });
  };
};

export const searchFilter = (search) => {
  return async (dispatch) => {
    dispatch({
      type: '@filter/SET_SEARCH',
      payload: { search }
    });
  };
};