import React from 'react';
import Message from './Message';

const MessageList = ({ messages }) => {
  const allMessages = messages.map( (message, index) => (
    <li key={index}><Message message={message}/></li>
  ));
  return (
    <ul className="message-list">
      {allMessages}
    </ul>
  );
};
export default MessageList;
