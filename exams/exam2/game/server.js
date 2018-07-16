const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;

app.use(express.static('./public'));

let users = [];

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

app.post('/login', bodyParser.json(), ( request, response ) => {
  addActiveUser(request.body.user)
  response.send(JSON.stringify(users));
});

app.delete('/login', bodyParser.json(), ( request, response ) => {
  deleteCurrentUser(request.body.user);
  response.send(JSON.stringify(users));
});

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
