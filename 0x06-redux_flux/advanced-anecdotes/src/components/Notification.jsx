/* eslint-disable  */

import { useSelector } from "react-redux";

const Notification = () => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  };

  const notification = useSelector((state) => state.notifications);
  const showNotification = notification !== "";

  return showNotification ? (
    <div style={style}>{notification}</div>
  ) : (
    <div></div>
  );
};

export default Notification;
