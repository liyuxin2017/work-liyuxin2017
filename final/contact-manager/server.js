const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;

app.use(express.static('./public'));

let users = [];
let contactList =[];
let contactIndex = 0;

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

const addContact = (contact) => {
  contact.index = contactIndex;
  contactIndex++;
  contactList.push(contact);
  contactList.sort((a, b) => {
    if (a.firstName.toString().toLowerCase() === b.firstName.toString().toLowerCase()) {
      return (a.lastName.toString().toLowerCase() < b.lastName.toString().toLowerCase() ? -1 : 1);
    } else {
      return (a.firstName.toString().toLowerCase() < b.firstName.toString().toLowerCase() ? -1 : 1);
    }});
};

const selectContact = (currentUser) => {
  return contactList.filter(function(contact, index) {
    return (contact.currentUser === currentUser);
  });
};

const deleteContact = (contactIndex) => {
  contactList = contactList.filter(function(contact) {
    return (contact.index + '' !== contactIndex);
  });
};

app.post('/login', bodyParser.json(), ( request, response ) => {
  addActiveUser(request.body.user);
  response.send(JSON.stringify(users));
});

app.delete('/login', bodyParser.json(), ( request, response ) => {
  deleteCurrentUser(request.body.user);
  response.send(JSON.stringify(users));
});

app.post('/contact', bodyParser.json(), ( request, response ) => {
  addContact(request.body);
  response.send(JSON.stringify(selectContact(request.body.currentUser)));
});

app.get('/contact/:currentUser', ( request, response ) => {
  response.send(JSON.stringify(selectContact(request.params.currentUser)));
});

app.delete('/contact', bodyParser.json(), ( request, response ) => {
  deleteContact(request.body.index);
  response.send(JSON.stringify(selectContact(request.body.currentUser)));
});

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
