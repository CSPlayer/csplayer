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

      //sort playlist
      let playlist = sortPlaylist(party.playlist, party.memberCount);

      //store updated playlist in db
      Party.update({partyName: partyName}, {$set: {playlist: playlist}}).exec((err, result) => {
        if (err) {
          //do some error handling
        } else {
          //emit playlist back to original client
          socket.emit("serverUpdatedPlaylist", playlist);
          //emit playlist to everyone else in the room
          socket.to(partyName).emit("serverUpdatedPlaylist", playlist);
        }
      });
    }
  });
}

//removes all songs disliked by more than half of the guests
//sorts songs with highest prority to the top
function sortPlaylist(playlist, memberCount) {
  return playlist.filter((track) => {
    if(track.rating <= Math.floor(memberCount*-1*.5)) {
      return false;
    }
    return true;
  }).sort((track1, track2) => {
    return track2.rating - track1.rating;
  });
}


module.exports.handle = handle;
