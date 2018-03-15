<template>
  <div>
    <h3 id="title">{{song.snippet.title}}</h3>
    <div id="vote-buttons" class="big-fa">
        <i class="far fa-arrow-alt-circle-up"></i><i class="far fa-arrow-alt-circle-down"></i>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PlaylistItem",
    data () {
      return {

      }
    },
    props: {
      song: {
        type: Object,
        default: {}
      }
    },
    methods: {
      upvote: function() {
        this.$emit("vote", this.song, 1);
      },
      downvote: function() {
        this.$emit("vote", this.song, -1);
      }
    }
  }
</script>

<style scoped>
  #title {
    float: left;
  }

  #vote-buttons {
    float: right;
  }

</style>