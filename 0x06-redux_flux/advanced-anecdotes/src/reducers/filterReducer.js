export const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'FILTER':
      return action.payload.filterText;
    default:
      return state;
  }
};

export const filterChange = (term) => {
  return {
    type: 'FILTER',
    payload: {
      filterText: term
    }
  };
};
