import React from 'react';

const GameListAndNewGame = () => {
  // const allMessages = messages.map( (message, index) => (
  //   <li key={index}><Message message={message}/></li>
  // ));
  return (
    <div className="game-list-area">
      <ul className="game-list">
      </ul>
      <input className='new-game-name'/>
      <button className="create-game">New Game</button>
    </div>
  );
};
export default GameListAndNewGame;
