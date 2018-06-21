const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;

app.use(express.static('./public'));

const messages = [];
const users = [];

const allMessages = () => ({ users, messages });

const addActiveUser = user => {
  if( !users.includes(user) ) {
    users.push( user);
  }
};

app.get('/messages', ( request, response ) => {
  response.send(JSON.stringify(allMessages()));
});

app.post('/messages', bodyParser.json(), ( request, response ) => {
  messages.push( { from: request.body.from, text: request.body.text } );
  addActiveUser(request.body.from);
  response.send(JSON.stringify(allMessages()));
});

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));

