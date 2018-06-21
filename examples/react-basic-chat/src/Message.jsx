import React from 'react';

const Message = ({ message }) => {
  return (<div className="message"><span className="from">{message.from}</span><span className="text">{message.text}</span></div>);
};

export default Message;
