import React from 'react';

const NewGame = ({ onCheckForSend, nameInProgress, onInputText, onSend, logout }) => {
  return (
    <div className="new-game-area">
      <input onChange={onInputText} onKeyUp={onCheckForSend} value={nameInProgress} className='new-name-text'/>
      <button onClick={onSend} className='send-name'>New Game</button>
      <button onClick={logout} className='logout-button'>Logout</button>
    </div>
  );
};
export default NewGame;
