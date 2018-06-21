import React from 'react';

const SendMessage = ({ onCheckForSend, messageInProgress, onInputText, onSend }) => {
  return (
    <div className='send-message-wrapper'>
      <input onChange={onInputText} onKeyUp={onCheckForSend} value={messageInProgress} className='new-message-text'/>
      <button onClick={onSend} className='send-message'>Send</button>
    </div>
  );
};
export default SendMessage;
