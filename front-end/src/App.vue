<template>
  <div id="app">
    <search-bar v-on:newPlaylistItem="addItemToPlaylist" id="app-searchbar"></search-bar>
    <playlist-body v-bind:room-playlist="getRoomPlaylist" id="app-playlistbody"></playlist-body>
    <player-bar v-bind:room-playlist="getRoomPlaylist" id="app-playerbar"></player-bar>
  </div>
</template>

<script>
import SearchBar from "./components/SearchBar"
import PlaylistBody from "./components/PlaylistBody"
import PlayerBar from "./components/PlayerBar"

export default {
  name: "App",
  data () {
    return {
      roomPlaylist: []
    }
  },
  components: {
    SearchBar,
    PlaylistBody,
    PlayerBar
  },
  methods: {
    addItemToPlaylist: function(videoItem) {
      this.roomPlaylist.push(videoItem);
    }
  },
  computed: {
    getRoomPlaylist: function() {
      return this.roomPlaylist;
    }
  }
}
</script>

<style>
  body {
    margin: 0;
    padding: 0;
    background-color: skyblue;
  }

  #app-searchbar {
    position: fixed;
    top: 0;
    width: 100%;
    height: 80px;
    background-color: aliceblue;
  }

  #app-playlistbody {
    margin-top: 100px;
  }

  #app-playerbar {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 80px;
    background-color: white;
  }
</style>
