const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;

app.use(express.static('./public'));

let games = [];
let users = [];
let moves = [];

const isContained = (aa, bb) => {
  if (!(aa instanceof Array)||!(bb instanceof Array)||((aa.length < bb.length))) {
		return false;
	}
  let bbIndex = 0;
  aa.forEach((move, index) => {
    if (move === bb[bbIndex]) {
      bbIndex++;
    }
  });
  if (bbIndex === 3) {
    return true;
  } else {
    return false;
  }
};

const allGames = () => ({ users, games });

const addActiveUser = user => {
  if( !users.includes(user) ) {
    users.push( user);
  }
};

const deleteCurrentUser = user => {
  users = users.filter(function(user, index) {
    return (user !== user)
  });

  games = games.filter((game, index) => {
    return (game.user !== user)
  });

  moves = moves.filter((move, index) => {
    return (move.host !== user && move.guest !== user)
  });
};

const findWinner = (moves, host, guest) => {
  const winCondition = [
    ['box box0', 'box box1', 'box box2'],
    ['box box3', 'box box4', 'box box5'],
    ['box box6', 'box box7', 'box box8'],
    ['box box0', 'box box3', 'box box6'],
    ['box box1', 'box box4', 'box box7'],
    ['box box2', 'box box5', 'box box8'],
    ['box box0', 'box box4', 'box box8'],
    ['box box2', 'box box4', 'box box6']
  ];
  let hostMoves = [];
  let guestMoves = [];
  let winner = '';
  moves.forEach((move, index) => {
    if (move.user === host) {
      hostMoves.push(move.move);
    } else {
      guestMoves.push(move.move);
    }
  });
  hostMoves.sort();
  guestMoves.sort();
  winCondition.forEach((oneCondition, index) => {
    if (isContained(hostMoves, oneCondition)) {
      winner = host;
    }});

  winCondition.forEach((oneCondition, index) => {
    if (isContained(guestMoves, oneCondition)) {
      winner = guest;
    }});

  return winner;
};

app.get('/game', ( request, response ) => {
  response.send(JSON.stringify(allGames()));
});

app.post('/game/:gameName', bodyParser.json(), ( request, response ) => {
  let isSame = false;
  let isGuest = false;
  games.map((game, index) => {
    if (game.game === request.params.gameName) {
      isSame = true;
      moves.map((move, index) => {
        if (move.game === request.body.game) {
          move.guest = request.body.user;
          isGuest = true;
        }
      });
      if (!isGuest) {
        response.status(555).send('Same Name!');
      }
    }
  })
  if (!isSame) {
    games.push( { user: request.body.user, game: request.body.game } );
    addActiveUser(request.body.user);
    moves.push({
      game : request.body.game,
      turn : request.body.user,
      host : request.body.user,
      guest : '',
      moves : [],
      winner : ''
    });
    response.send(JSON.stringify(allGames()));
  }
});

app.post('/login', bodyParser.json(), ( request, response ) => {
  addActiveUser(request.body.user);
  response.send(JSON.stringify(users));
});

app.delete('/login', bodyParser.json(), ( request, response ) => {
  deleteCurrentUser(request.body.user);
  response.send(JSON.stringify(users));
});

app.put('/game/:gameName', bodyParser.json(), ( request, response ) => {
  moves.map((move, index) => {
    if (move.game === request.params.gameName) {
      move.moves.push(request.body);
      if (move.turn === move.host) {
        move.turn = move.guest;
      } else {
        move.turn = move.host;
      }
      move.winner = findWinner(move.moves, move.host, move.guest);
      if (move.winner !== '') {
        move.turn = '';
      }
      response.send(JSON.stringify(move));
    }
  });
});

app.get('/game/:gameName', ( request, response ) => {
  moves.map((move, index) => {
    if (move.game === request.params.gameName) {
      response.send(JSON.stringify(move));
    }
  });
});

app.delete('/game/:gameName', ( request, response ) => {
  games = games.filter((game, index) => {
    return (game.game !== request.params.gameName);
  });
  moves = moves.filter((move, index) => {
    return (move.game !==  request.params.gameName);
  });
});

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
