/* move state management to reduxjs/toolit */

import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filterChange (state, action) {
      return action.payload;
    }
  }
});

/*
export const filterReducer = (state = "", action) => {
  switch (action.type) {
    case "FILTER":
      return action.payload.filterText;
    default:
      return state;
  }
};

export const filterChange = (term) => {
  return {
    type: "FILTER",
    payload: {
      filterText: term,
    },
  };
};
*/

export const { filterChange } = filterSlice.actions;
export default filterSlice.reducer;
