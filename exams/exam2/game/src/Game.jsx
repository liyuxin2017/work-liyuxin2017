import React from 'react';

const Game = ({ game, enterGame }) => {
  return (
    <div className="game">
      <button className={game.game} onClick={enterGame}>Enter</button>
      <span className="username">{game.user}</span>
      <span className="game-name">{game.game}</span>
    </div>);
};

export default Game;
