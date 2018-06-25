import React from 'react';

const SendMessage = ({ onCheckForSend, messageInProgress, onInputText, onSend, logout, currentUser }) => {
  let logoutAreaClassName = 'send-message-wrapper';
  if (currentUser === '') {
    logoutAreaClassName += ' logout-not-display';
  }
  return (
    <div className={logoutAreaClassName}>
      <input onChange={onInputText} onKeyUp={onCheckForSend} value={messageInProgress} className='new-message-text'/>
      <button onClick={onSend} className='send-message'>Send</button>
      <button onClick={logout} className='logout-button'>Logout</button>
    </div>
  );
};
export default SendMessage;
