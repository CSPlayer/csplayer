//const db = require("./fakedb");

function handle(socket) {

  let masterPlaylist = [];

  socket.on("room", function(partyId) {
    socket.join(partyId);
    console.log("Joined " + partyId);
  });

  socket.on("clientAddedItemToPlaylist", function(track) {
    masterPlaylist.push(track);
    socket.emit("serverUpdatedPlaylist", masterPlaylist);
  });

  socket.on("clientCastedVote", function(track, vote) {
    let specificTrack = getTrackObject(track.id, masterPlaylist);

    if (specificTrack !== null) {
      specificTrack.rating += vote;
      socket.emit("serverUpdatedPlaylist", masterPlaylist);
    }
  });

  socket.on("clientSongHasEnded", function() {
    if (masterPlaylist.length > 0) {
      masterPlaylist.shift();
    }

    socket.emit("serverUpdatedPlaylist", masterPlaylist);
  })
}

function getTrackObject(id, masterPlaylist) {
  for (let track of masterPlaylist) {
    if (track.id === id) {
      return track;
    }
  }

  return null;
}

module.exports.handle = handle;
