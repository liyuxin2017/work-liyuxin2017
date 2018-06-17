const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 3000;

app.use(express.static('./public'));

app.get('/report', ( request, response ) => {
  let log = "Button "  + request.query.button + " was pressed";
  console.log(log);
  response.send();
});

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
