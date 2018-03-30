<template>
  <div>
    <h3 id="title">{{track.videoItem.snippet.title}}</h3>

    <div id="vote-buttons" class="big-fa">
      <button v-on:click="upvote"><i class="far fa-arrow-alt-circle-up"></i></button>
      <button v-on:click="downvote"><i class="far fa-arrow-alt-circle-down" ></i></button>
    </div>

    <h3 id="rating">{{track.rating}}</h3>

  </div>
</template>

<script>
  export default {
    name: "PlaylistItem",

    props: {
      track: {
        type: Object
      }
    },

    methods: {
      upvote: function() {
        this.$emit("vote", this.track, 1);
      },
      downvote: function() {
        this.$emit("vote", this.track, -1);
      }
    }
  }
</script>

<style scoped>
  * {
    display: inline-block;
  }

  #rating {
    color: blue;
  }

</style>
