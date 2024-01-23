const Notification = ({ type, message }) => {
  if (message !== '') {
    return <div className={type}>{message}</div>;
  }
};

export default Notification;
