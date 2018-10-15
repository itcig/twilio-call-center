const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

const Twilio = require('twilio');
const client = new Twilio(process.env.REACT_APP_TWILIO_ACCOUNT_SID, process.env.REACT_APP_TWILIO_AUTH_TOKEN);


app.get('/api/test', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Dude, what's mine say?!` }));
  //{name: 'dude'},{name: 'sweet'}
  //res.send(['dude', 'sweet']);

});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);