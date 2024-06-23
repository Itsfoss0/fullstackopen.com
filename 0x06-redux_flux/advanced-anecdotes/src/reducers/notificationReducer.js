/* reducer for setting and clearing notifications */

import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    changeNotitication (state, action) {
      return action.payload;
    }
  }
});

export const setNotification = (notification, duration) => {
  return async (dispatch) => {
    dispatch(changeNotitication(notification));
    setTimeout(() => {
      dispatch(changeNotitication(''));
    }, duration * 1000);
  };
};

export const { changeNotitication } = notificationSlice.actions;
export default notificationSlice.reducer;
