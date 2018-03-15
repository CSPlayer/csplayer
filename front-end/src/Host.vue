<template>
  <div id="app">
    <search-bar id="app-searchbar" v-on:newPlaylistItem="addItemToPlaylist"></search-bar>

    <ul id="app-playlistbody">
      <li v-for="item in getRoomPlaylist">
        <playlist-item v-bind:song="item" v-on:vote="updateItemRating" :key="item.id.id"></playlist-item>
      </li>
    </ul>
    
    <player-bar id="app-playerbar" v-bind:room-playlist="getRoomPlaylist"></player-bar>
  </div>
</template>

<script>
import io from "socket.io-client"

import SearchBar from "./components/SearchBar"
import PlaylistItem from "./components/PlaylistItem"
import PlayerBar from "./components/PlayerBar"

export default {
  name: "Host",
  data () {
    return {
      roomPlaylist: [],
      webSocket: {}
    }
  },
  components: {
    SearchBar,
    PlaylistItem,
    PlayerBar
  },
  methods: {
    /**
     * @summary Pushes a video object to this roomPlaylist
     * @description
     * Listens for users clicking on search results and adds
     * the object to this roomPlaylist
     * @listens SearchBar#addToPlaylist
     * @return {void}
     */ 
    addItemToPlaylist: function(videoItem) {
      this.roomPlaylist.push(videoItem);
    },
    updateItemRating: function(value) {
      
    }
  },
  computed: {
    getRoomPlaylist: function() {
      return this.roomPlaylist;
    }
  },
  mounted: function() {
    this.webSocket = io("http://localhost:8081");
  }
}
</script>

<style scoped>
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

  ul {
    list-style-type: none;
  }

  #app-playerbar {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 80px;
    background-color: white;
  }
</style>
