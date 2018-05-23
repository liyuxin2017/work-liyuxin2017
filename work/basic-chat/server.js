const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 3000;

app.use(express.static('./public'));


const fakeMessages = [
  {
    from: "Preetha",
    text: "Does this thing work?"
  },
  {
    from: "Bob",
    text: "Wow, it does!"
  }
];

app.get('/messages', ( request, response ) => {
  response.send(JSON.stringify(fakeMessages));
});

app.post('/messages', bodyParser.json(), ( request, response ) => {
  fakeMessages.push( { from: request.body.from, text: request.body.text } );
  response.send();
});

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));

