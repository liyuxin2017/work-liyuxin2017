import React from 'react';
import Game from './Game';

const GameList = ({ games }) => {
  const allGames = games.map((game, index) => (
    <li key={index}><Game game={game}/></li>
  ));
  return (
    <ul className="game-list">
      {allGames}
    </ul>
  );
};
export default GameList;
