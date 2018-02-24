<template>
  <div id="app">
    <SearchBar v-on:newPlaylistItem="addItemToPlaylist" id="app-searchbar"></SearchBar>
    <PlayerBar id="app-playerbar"></PlayerBar>
  </div>
</template>

<script>
import SearchBar from "./components/SearchBar"
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
    PlayerBar
  },
  methods: {
    addItemToPlaylist: function(videoId) {
      this.roomPlaylist.push(videoId);
      console.log(videoId);
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

  #app-playerbar {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 80px;
    background-color: white;
  }
</style>
