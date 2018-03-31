"use strict";

let masterPlaylist = [];

function handle(socket) {
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
  
  });
}

function getTrackObject(id) {
  for (let track of masterPlaylist) {
    if (track.id === id) {
      return track;
    }
  }

  return null;
}

module.exports.handle = handle;