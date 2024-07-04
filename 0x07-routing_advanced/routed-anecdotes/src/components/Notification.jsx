import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  return notification !== '' ? <div>{notification}</div> : <div />;
};

export default Notification;
