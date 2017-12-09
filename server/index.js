const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');
const path = require('path');

const app = express();
var cool = require('cool-ascii-faces');
const corsOptions = {
  "origin": "*",
  "Access-Control-Allow-Origin": "*",
  "methods": "GET, POST, PUT",
  "preflightContinue": true,
  "optionsSuccessStatus": 204,
  "credentials": true
};

const PORT = process.env.PORT || 5000;

// Priority serve any static files.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(morgan('dev'));

app.use(express.static(path.resolve(__dirname, '../react-ui/build')));
app.use('/API', routes);

// Answer API requests.
app.get('/api', function (req, res) {
  res.set('Content-Type', 'application/json');
  res.send(`{"message":"${cool()}"}`);

});

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
