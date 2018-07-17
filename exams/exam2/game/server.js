const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;

app.use(express.static('./public'));

let games = [];
let users = [];

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
  games.map((game, index) => {
    if (game.game === request.params.gameName) {
      response.status(555).send('Same Name!');
      isSame = true;
    }
  })
  if (!isSame) {
    games.push( { user: request.body.user, game: request.body.game } );
    addActiveUser(request.body.user);
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

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
