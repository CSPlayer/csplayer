const Party = require('../models/Party');

function handle(socket) {

  let partyName;

  socket.on("room", function(partyId) {
    partyName = partyId;

    socket.join(partyName);
    console.log(socket.id + " Joined " + partyName);

    //send newcomer a copy of the playlist
    Party.findOne({partyName: partyName}).exec((err, party) => {
      if (err) {
        //do some error handling
      } else {
        socket.emit("serverUpdatedPlaylist", party.playlist);
      }
    });
  });

  socket.on("clientAddedItemToPlaylist", function(track) {
    //add song to playlist
    Party.update({partyName: partyName}, {$push: {playlist: track}}).exec((err, result) => {
      if (err) {
        //do some error handling
      } else {
        distributePlaylist(socket, partyName);
      }
    });
  });

  socket.on("clientCastedVote", function(track, vote) {
    //update track priority in playlist
    Party.update({"partyName":partyName, "playlist":track}, {"$inc": {"playlist.$.rating":vote}}).exec((err, result) => {
      if (err) {
        //do something
      } else {
        distributePlaylist(socket, partyName);
      }
    });
  });

  socket.on("clientSongHasEnded", function() {
    //pop the song at the head of the playlist
    Party.update({"partyName":partyName}, {"$pop": {"playlist":-1}}).exec((err, result) => {
      if (err) {
        //do something
      } else {
        distributePlaylist(socket, partyName);
      }
    });
  });
}

function distributePlaylist(socket, partyName) {
  //get latest copy of the playlist
  Party.findOne({partyName: partyName}).exec((err, party) => {
    if (err) {
      //do some error handling
    } else {
      //emit playlist to original client
      socket.emit("serverUpdatedPlaylist", party.playlist);
      //emit playlist to everyone else in the room
      socket.to(partyName).emit("serverUpdatedPlaylist", party.playlist);
    }
  });
}

module.exports.handle = handle;
