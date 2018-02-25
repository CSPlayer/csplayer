<template>
  <ul>
    <li
      v-for="song in roomPlaylist">
      {{ song.snippet.title }}
    </li>
  </ul>
</template>

<script>
  export default {
    name: "PlaylistBody",
    data () {
      return {
      }
    },
    props: ["roomPlaylist"],
    methods: {

    }
  }
</script>

<style scoped>
  ul {
    width: 80%;
    margin: 0 auto;
    padding: 0;
    list-style-type: none;
  }

  li {
    padding: 16px;
    margin: 4px;
    font-size: 24px;
    border: 2px solid grey;
    box-shadow: 2px 2px 3px darkgray;
  }
</style>