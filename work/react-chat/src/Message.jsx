import React from 'react';

const Message = ({ message, currentUser}) => {
  let myMessageClassName = '';
  if (message.from === currentUser) {
    myMessageClassName = 'message my-message';
  }
  return (
    <div className={myMessageClassName}>
      <span className="from">{message.from}</span>
      <span className="text">{message.text}</span>
    </div>);
};

export default Message;
