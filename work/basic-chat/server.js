const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 3000;

app.use(express.static('./chat'));


const fakeMessages = [
  {
    from: "Preetha",
    text: "Does this thing work?"
  },
  {
    from: "Bob",
    text: "it does!"
  }
];

const userList = [];

app.get('/messages', ( request, response ) => {
  const messagesAndUsers = { messages: JSON.stringify(fakeMessages), users: JSON.stringify(userList)};
  response.send(messagesAndUsers);
});

app.post('/messages', bodyParser.json(), ( request, response ) => {
  fakeMessages.push( { from: request.body.from, text: request.body.text } );
  response.send();
});

app.delete('/login', bodyParser.json(), ( request, response ) => {
  userList.forEach((user, index) => {
    if (user.user ==request.body.user){
      userList.splice(index, 1);
    }
  });
  response.send(JSON.stringify(userList));
  console.log(userList);
});

app.post('/login', bodyParser.json(), ( request, response ) => {
  let exist = false;
  userList.forEach((user) => {
    if (user.user == request.body.user){
      exist = true;
    }
  });
  if (!exist) {
    userList.push( { user: request.body.user } );
  }
  response.send(JSON.stringify(userList));
  console.log(userList);
});

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
