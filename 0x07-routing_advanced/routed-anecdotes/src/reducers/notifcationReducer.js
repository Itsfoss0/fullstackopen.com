/* eslint-disable no-unused-vars */

import { createSlice } from '@reduxjs/toolkit';

const notificaionSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification (state, action) {
      return action.payload;
    },
    clearNotification () {
      return '';
    }
  }
});

export const notify = (message) => {
  return async (dispatch, getState) => {
    dispatch(setNotification(message));
  };
};

export const { setNotification, clearNotification } = notificaionSlice.actions;
export default notificaionSlice.reducer;
