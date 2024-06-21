/* reducer for setting and clearing notifications */

import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification (state, action) {
      return action.payload;
    }
  }
});

export const { setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
