import React from 'react';

const Game = ({ game }) => {
  return (
    <div className="game">
      <button>Enter</button>
      <span className="username">{game.user}</span>
      <span className="game-name">{game.game}</span>
    </div>);
};

export default Game;
