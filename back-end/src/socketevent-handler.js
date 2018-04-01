"use strict";

const db = require("./fakedb");

let currentRooms = new Map();
let masterPlaylist = [];

function handle(socket) {

  let socketPartyId;

  socket.on("room", function(partyId) {
    socketPartyId = partyId;
    socket.join(socketPartyId);
    console.log("Joined " + partyId);
    socket.emit("message", "room stuff " + socketPartyId);
  });
  
  socket.on("clientAddedItemToPlaylist", function(track) {
    masterPlaylist.push(track);
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