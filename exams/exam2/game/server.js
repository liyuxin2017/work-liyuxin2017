const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;

app.use(express.static('./public'));

let games = [];
let users = [];
let moves = [];

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
      moves : []
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

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
