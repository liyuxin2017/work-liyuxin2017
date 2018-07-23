import React from 'react';

const TicTacToe = ({ logout, moves, sendMove, turn }) => {
  const boxes = moves.map((move, index) => {
    const boxClassName = "box box" + index;
    if (turn) {
      return (
        <div className={boxClassName} onClick={sendMove} key={index}>{move}</div>
      );
    } else {
      return (
        <div className={boxClassName} key={index}>{move}</div>
      );
    }
  });
  
  return (
    <div>
      <div className="game-area">
        {boxes}
      </div>
      <div>
        <button onClick={logout} className='logout-button'>Logout</button>
      </div>
  </div>
  );
};

export default TicTacToe;
