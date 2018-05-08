const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('./public')); // Never actually serve up the same dir as your programs
// public or built or dist directories are more common and safer

app.get('/demo', function( request, response ) {
  const someNumber = request.query.someNumber;
  response.send(`I saw ${someNumber}`);
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
