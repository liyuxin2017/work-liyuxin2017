import React from 'react';

const TicTacToe = ({ logout, moves, sendMove }) => {
  const boxes = moves.map((move, index) => {
    const boxClassName = "box box" + index;
    return (
      <div className={boxClassName} onClick={sendMove} key={index}>{move}</div>
    );
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
