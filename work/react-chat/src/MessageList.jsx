import React from 'react';
import Message from './Message';

const MessageList = ({ messages, currentUser }) => {
  const allMessages = messages.map( (message, index) => (
    <li key={index}><Message message={message} currentUser={currentUser}/></li>
  ));
  return (
    <ul className="message-list">
      {allMessages}
    </ul>
  );
};
export default MessageList;
