const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

//connect to database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost');
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  console.log("Connection Succeeded");
});

//const Party = require('../models/Party');

//create backend app
const app = express();
const server = app.listen(process.env.PORT || 8081);

//create websockets
const io = require('socket.io').listen(server);
const socketEventHandler = require('./socketevent-handler');

//setup middleware
// app.use(morgan('combined'))
app.use(bodyParser.json());
app.use(cors());

//set up routes for registration API
require('./registration-routes').init(app);

//enable socket-io
io.on("connection", function(socket) {
  console.log("Connected");
  socketEventHandler.handle(socket);
});
