const Notification = ({ message, type }) => {
  if (message === undefined) {
    return null;
  }

  return <div className={type}>{message}</div>;
};

export default Notification;
