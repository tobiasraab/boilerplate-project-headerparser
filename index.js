// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// ip info endpoint
app.get('/api/whoami', function (req, res) {
  try {
    const IP_ADDRESS = req.header('x-forwarded-for') || req.socket.remoteAddress;
    const LANGUAGE = req.acceptsLanguages().toString()
    const AGENT = req.headers['user-agent']

    const RESPONSE = {
      ipaddress: IP_ADDRESS,
      language: LANGUAGE,
      software: AGENT
    }

    res.send(RESPONSE)
    console.log(IP_ADDRESS)
    console.log(LANGUAGE)
    console.log(req.headers['user-agent'])
  }
  catch {
    res.send({
      error: 'Server Error'
    })
  }
})

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
