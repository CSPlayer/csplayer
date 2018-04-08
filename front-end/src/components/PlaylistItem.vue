<template>
  <div id="playlist-item">

    <div>
      <h1 id="title">{{track.videoItem.snippet.title}}</h1>
    </div>

    <div>
      <div id="vote-buttons" class="big-fa">
        <button v-show="!isTrackDownvoted" v-bind:class="{ 'upvote-color': isTrackUpvoted }"  v-on:click="upvote">
          <i class="far fa-arrow-alt-circle-up"></i>
        </button>

        <button v-show="!isTrackUpvoted" v-bind:class="{ 'downvote-color': isTrackDownvoted }" v-on:click="downvote">
          <i class="far fa-arrow-alt-circle-down" ></i>
        </button>
      </div>
      
      <h3 id="rating">{{track.rating}}</h3>
    </div>

  </div>
</template>

<script>
  export default {
    name: "PlaylistItem",

    data () {
      return {
        upvoted: false,
        downvoted: false
      }
    },

    props: {
      track: {
        type: Object
      }
    },

    methods: {
      upvote: function() {
        if (!this.upvoted) {
          this.$emit("vote", this.track, 1);
          this.upvoted = true;
        }
      },
      downvote: function() {
        if (!this.downvoted) {
          this.$emit("vote", this.track, -1);
          this.downvoted = true;
        }
      }
    },

    computed: {
      isTrackUpvoted: function() {
        return this.upvoted;
      },
      isTrackDownvoted: function() {
        return this.downvoted;
      }
    }
  }
</script>

<style scoped>
  #playlist-item {
    color: #e3e3e3;
    border: 1px solid #444444;
    background-color: #222222;
    /* max-width: 768px; */
    text-align: center;
    margin: auto;
    padding: 20px;
  }

  #playlist-item * {
    display: inline-block;
  }

  button {
    border: none;
    color: #e3e3e3;
    font-size: 1.5em;
    background-color: rgba(0, 0, 0, 0);
  }

  .upvote-color {
    color: orange;
  }

  .downvote-color {
    color: blue;
  }

</style>
