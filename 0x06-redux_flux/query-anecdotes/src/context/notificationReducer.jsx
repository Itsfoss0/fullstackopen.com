/* eslint-disable */

import { createContext, useReducer } from "react";

const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case "ADD_NOTIFICATION":
      return action.payload;
    case "CLEAR_NOTIFICATION":
      return "";
    default:
      return state;
  }
};

export const setNotification = (content) => {
  return {
    type: "ADD_NOTIFICATION",
    payload: content,
  };
};

export const clearNotification = () => {
  return {
    type: "CLEAR_NOTIFICATION",
  };
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, dispatchNotification] = useReducer(
    notificationReducer,
    ""
  );
  return (
    <NotificationContext.Provider value={[notification, dispatchNotification]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
