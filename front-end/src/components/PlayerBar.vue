<template>
  <div class="center vertical-offset">
    <hr id="progress-bar">
    <div id="yt-player"></div>

    <div v-show="isCurrentlyPlaying">
      <button v-on:click="pauseVideo"><i class="fas fa-pause big-fa" aria-hidden="true"></i></button>
    </div>
    <div v-show="!isCurrentlyPlaying">
      <button v-on:click="playVideo"><i class="fas fa-play big-fa" aria-hidden="true"></i></button>
    </div>

  </div>
</template>

<script>
  export default {
    name: "PlayerBar",

    data () {
      return {
        isFirstSong: true,
        isPlaying: false,
        player: {
          ytPlayer: {} // This will be set to the YT player object when mounted
        } 
      }
    },

    props: {
      track: {
        type: Object
      }
    },
    
    methods: {
      playVideo: function() {
        if (this.track === null || this.track === undefined) {
          alert("Add a song in the search bar first!");
          return;
        }

        this.player.ytPlayer.playVideo();
        this.isPlaying = true;
      },

      pauseVideo: function() {
        this.player.ytPlayer.pauseVideo();
        this.isPlaying = false;
      }
    },

    computed: {
      isCurrentlyPlaying: function() {
        return this.isPlaying;
      },

      getCurrentTrack: function() {
        return this.track;
      }
    },

    watch: {
      track: function(currentTrack, oldTrack) {
        if (currentTrack !== undefined) {
          if (oldTrack === undefined) {
          this.player.ytPlayer.cueVideoById(currentTrack.videoItem.id.videoId, 0, "small");
          }
          else if (oldTrack.id !== currentTrack.id) {
            this.player.ytPlayer.loadVideoById(currentTrack.videoItem.id.videoId, 0, "small");
          }
        }
      }
    },

    mounted () {
      /**
       * Triggers when this component is done mounting onto the DOM
       * This first block asynchronously creates and loads the YouTube player API
       * The second block set this player to be a new YT Player with certain settings
       * [YouTube Player API]{@link https://developers.google.com/youtube/iframe_api_reference}
       */
      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/player_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      var playerBar = this;
      
      window.onYouTubeIframeAPIReady = function() {
        playerBar.player.ytPlayer = new YT.Player("yt-player", {
          height: "0",
          width: "0",
          videoId: "",
          playerVars: {
            autoplay: "0", // Turn off autoplay
            cc_load_policy: "0", // Do not load closed captions
            disablekb: "0", // Disable the default key controls for videos
            iv_load_policy: "3", // Do not show annotations
            rel: "0" // Do not show related videos after one ends
          },
          events: {
            "onReady": window.console.log("YouTube iFrame Ready"),
            "onError": function(event) {
              console.log("YouTube iFrame Error " + event.data);
            },
            "onStateChange": function(event) {
              if (event.data === YT.PlayerState.ENDED) {
                playerBar.$emit("songEnd");
              }
            }
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