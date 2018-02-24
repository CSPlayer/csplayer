<template>
  <div class="center vertical-offset">
    <hr id="progress-bar">
    <div id="yt-player"></div>
    <button v-if="isPlaying" v-on:click="pauseVideo"><i v-if="isPlaying" class="fa fa-pause big-fa" aria-hidden="true"></i></button>
    <button v-else v-on:click="playVideo"><i class="fa fa-play big-fa" aria-hidden="true"></i></button>
  </div>
</template>

<script>
  export default {
    name: "PlayerBar",
    data () {
      return {
        isPlaying: false,
        player: {} // This will be set to the YT player object when mounted
      }
    },
    props: ["roomPlaylist"],
    methods: {
      /**
       * @summary Plays the currently loaded video, or alerts to add a video
       * @return {void}
       */
      playVideo: function() {
        if (this.roomPlaylist === undefined || this.roomPlaylist.length === 0) {
          alert("Add a song in the search bar first!");
          return;
        }

        this.player.loadVideoById(this.roomPlaylist[0]["id"]["videoId"], 0, "small");
        this.player.playVideo();
        this.isPlaying = true;
      },
      /**
       * @summary Pauses the currently playing video
       * @return {void}
       */
      pauseVideo: function() {
        this.player.pauseVideo();
        this.isPlaying = false;
      }
    },
    computed: {
      /**
       * @summary Tells whether the player is currently playing a song
       * @description
       * Gets this isPlaying value and also updates the
       * play/pause button on the screen
       * @return {boolean} Is this player currently playing
       */
      currentlyPlaying: function() {
        return this.isPlaying;
      }
    },
    mounted () {
      /**
       * Triggers when this component is done mounting onto the DOM
       * This first block asyncronously creates and loads the YouTube player API
       * The second block set this player to be a new YT Player with certain settings
       * [YouTube Player API]{@link https://developers.google.com/youtube/iframe_api_reference}
       */
      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/player_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      var playerBar = this;
      
      window.onYouTubeIframeAPIReady = function() {
        playerBar.player = new YT.Player("yt-player", {
          height: "0",
          width: "0",
          videoId: "",
          // videoId: "PMhWCD6u4fA",  
          playerVars: {
            autoplay: "0", // Turn off autoplay
            cc_load_policy: "0", // Do not load closed captions
            disablekb: "0", // Disable the default key controls for videos
            iv_load_policy: "3", // Do not show annotations
            rel: "0" // Do not show related videos after one ends
          }
        });
      }
    }
  }

  
</script>

<style scoped>
  #progress-bar {
    margin-top: -20px;
    border: 2px solid red;
  }
</style>