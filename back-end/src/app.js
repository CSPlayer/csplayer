const express = require('express');
const app = express();

const server = app.listen(process.env.PORT || 8081);
const io = require('socket.io').listen(server);

const bodyParser = require('body-parser');
const cors = require('cors');
// const morgan = require('morgan');

const socketEventHandler = require('./socketevent-handler');

// app.use(morgan('combined'))
app.use(bodyParser.json());
app.use(cors());

app.post('/register_party', (req, res) => {
  res.send({message: 'Party was successfully registered!'})
});

app.post('/register_guest', (req, res) => {
  res.send({message: 'Guest was successfully registered!'})
});

io.on("connection", function(socket) {
  console.log("Connected");
  socketEventHandler.handle(socket, io);
});