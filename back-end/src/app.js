const express = require('express');
const app = express();

const server = app.listen(process.env.PORT || 8081);
const io = require('socket.io').listen(server);

const bodyParser = require('body-parser');
const cors = require('cors');
// const morgan = require('morgan');

// app.use(morgan('combined'))
app.use(bodyParser.json());
app.use(cors());

app.post('/register_party', (req, res) => {
  res.send({message: 'Party was successfully registered!'})
});

app.post('/register_guest', (req, res) => {
  res.send({message: 'Guest was successfully registered!'})
});


// TODO: Clean this up
let masterPlaylist = [];

io.on("connection", function(socket) {

  console.log("Connected");
  masterPlaylist = [];

  socket.on("created", function(room) {
    console.log(room + " created");
  });

  socket.on("clientAddedItemToPlaylist", function(track) {
    masterPlaylist.push(track);
    console.log(track.id);
    socket.emit("serverUpdatedPlaylist", masterPlaylist);
  });

  socket.on("clientCastedVote", function(track, vote) {
    let specificTrack = getTrackObject(track.id);

    if (specificTrack !== null) {
      specificTrack.rating += vote;
      socket.emit("serverUpdatedPlaylist", masterPlaylist);
    }

  })
});


function getTrackObject(id) {
  for (let track of masterPlaylist) {
    if (track.id === id) {
      return track;
    }
  }

  return null;
}