import { createSlice } from '@reduxjs/toolkit';

const notificationReducer = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    addNotification (state, action) {
      return action.payload;
    },
    clearNotification () {
      return '';
    }
  }
});

export const notify = (message, duration) => {
  return (dispatch, getState) => {
    dispatch(addNotification(message));

    setTimeout(() => {
      dispatch(clearNotification());
    }, duration);
  };
};

export const { addNotification, clearNotification } =
  notificationReducer.actions;
export default notificationReducer.reducer;
