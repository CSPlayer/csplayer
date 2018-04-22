<template>
  <div id="app">
    <search-bar id="guest-searchbar" v-on:newPlaylistItem="addItemToPlaylist"></search-bar>

    <ul id="guest-playlistbody">
      <li v-for="item in getRoomPlaylist">
        <playlist-item v-bind:track="item"
                       v-on:vote="castVote"
                       :key="item.id.id">
        </playlist-item>
      </li>
    </ul>
  </div>
</template>

<script>
import SearchBar from "./components/SearchBar"
import PlaylistItem from "./components/PlaylistItem"

import io from "socket.io-client"

const backendURL = "http://localhost:8081";

export default {
  name: "Guest",

  data () {
    return {
      roomPlaylist: [],
      socket: {}
    }
  },

  components: {
    SearchBar,
    PlaylistItem,
  },

  methods: {
    /**
     * @summary Pushes a track to this roomPlaylist
     * @description
     * Listens for users clicking on search results and wraps the video
     * into a track object with a timestamp and rating before adding
     * to this roomPlaylist
     * @param {object} videoItem - YouTube video object
     * @listens SearchBar#addToPlaylist
     * @emits Server#clientAddedItemToPlaylist
     */
    addItemToPlaylist: function(videoItem) {
      let track = {
        videoItem: videoItem,
        rating: 0,
        id: new Date().getTime()
      };

      this.socket.emit("clientAddedItemToPlaylist", track);
    },

    /**
     * @summary Emits a vote to the server to update the track rating
     * @param {object} track - This application's track item
     * @param {number} vote - Either a 1 or -1 indicating up or down vote
     * @listens PlaylistItem#vote
     * @emits Server#clientCastedVote
     */
    castVote: function(track, vote) {
      this.socket.emit("clientCastedVote", track, vote);
    },

    /**
     * @summary Updates the playlist to move to the next song
     * @listens Playerbar#songEnded
     * @emits Server#clientSongHasEnded
     */
    cueNextTrack: function() {
      this.socket.emit("clientSongHasEnded");
    }
  },

  computed: {
    getRoomPlaylist: function() {
      return this.roomPlaylist;
    },

    getCurrentTrack: function() {
      return this.roomPlaylist[0];
    }
  },

  /**
   * @summary Initializes the socket and sets up the listeners
   */
  created: function() {
    this.socket = io(backendURL);

    let guest = this;

    this.socket.on("connect", function() {
      let partyId = guest.$route.params.partyId;
      guest.socket.emit("room", partyId);
    });

    this.socket.on("serverUpdatedPlaylist", function(updatedPlaylist) {
      console.log("Received new playlist");
      console.log(updatedPlaylist);
      guest.roomPlaylist = updatedPlaylist;
    });
  }
}
</script>

<style scoped>
  #guest-searchbar {
    width: 100%;
    height: 80px;
    background-color: #222222;
    margin: 0;
  }

  #guest-playlistbody {
    height: calc(100% - 80px);
    background-color: #444444;
    margin: 0;
  }

  ul {
    list-style-type: none;
  }
</style>
