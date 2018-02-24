<template>
  <div class="center vertical-offset">
    <button v-on:click="ytSearch(query)"><i class="fa fa-search big-fa" aria-hidden="true"></i></button><input v-model="query" v-on:keyup.enter="ytSearch(query)" type="search">
    <ul id="search-results">
      <li
        v-for="(title, index) in getVideoTitles" 
        v-on:click="addToPlaylist(index)">
        {{ title }}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "SearchBar",
    data () {
      return {
        query: "", 
        results: []
      }
    },
    methods: {
      /**
      * @summary Performs a video look up with the given query
      * @description
      * After clicking the button or pressing enter, this makes a GET request and
      * populates the component's results array with the top five results
      * @param {string} query - Query entered by user
      * @return {void}
      */  
      ytSearch: function(query) {
        let searchBar = this;
        $.get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${query}&key=AIzaSyD-pVsu7hyh4_vhSB5SearFS5BqZJr3kM0`,
          function(data) {
            data["items"].forEach(function(item) {
              searchBar.results.push(item);
            });
          }
        )
      },
      /**
       * @summary Emits and passes a YT video object to the parent
       * @description
       * After clicking on one of the search items, the object
       * is sent to the parent to add to the playlist
       * @param {int} index - Index from this results array
       * @return {void} 
       */
      addToPlaylist: function(index) {
        this.$emit("newPlaylistItem", this.results[index]);
        this.results = [];
        this.query = "";
      }
    },
    computed: {
      /**
       * @summary Computes the list of video titles
       * @description
       * When this results array gets populated, a dropdown of the
       * video titles appears. Clicking on them adds to the playlist
       * @see addToPlaylist
       * @return {Array} An array of video titles corresponding to their videoIds
       */
      getVideoTitles: function() {
        return this.results.map(function(entry) {
          return entry["snippet"]["title"];
        });
      }
    }
  }
</script>

<style scoped>
  input {
    font-size: 32px;
    border-width: 0px 0px 2px 0px;
    border-color: darkslategray;
    background-color: rgba(255, 255, 255, 0);
    margin-left: 5px;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

/* TODO: Align the search results and clean CSS */
  #search-results {
    position: relative;
    left: 35%; 
    text-align: left;
    font-size: 18px;
  }

    #search-results > li {
      background-color: whitesmoke;
      padding: 5px 0 5px 0;
      border: 1px solid grey;
    }
</style>