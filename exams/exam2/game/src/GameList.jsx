import React from 'react';
import Game from './Game';

const GameList = ({ games, enterGame }) => {
  const allGames = games.map((game, index) => (
    <li key={index}><Game game={game} enterGame={enterGame}/></li>
  ));
  return (
    <ul className="game-list">
      {allGames}
    </ul>
  );
};
export default GameList;
