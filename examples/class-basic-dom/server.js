const express = require('express');
const app = express();

const PORT = 3000;

app.use(express.static('./public'));

app.get('/example', function( req, res ) {
  res.send('Dynamic!');
});

app.get('/demo.html', function( req, res ) {
  res.send(`
  <!DOCTYPE html>
  <html>
  <head>
  <link rel="stylesheet" href="example.css"></link>
  </head>
  <body>
     <p>This is paragraph <span class="para-title">one</span></p>
     <p>This is paragraph <span class="para-title">two</span></p>
  </body>
  </html>
  `);
});

app.get('/example.css', function( req, res ) {
  res.setHeader('Content-type', 'text/css');
  res.send(`
  .para-title {
    background-color: #A1D107;
  }
  `);
});


app.listen(PORT, function() { console.log(`Listening on http://localhost:${PORT}`); });


