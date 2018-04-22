<template>
  <div id="search-bar" class="center">

    <div class="center">
      <button v-on:click="ytSearch(query)"><i class="fa fa-search big-fa" aria-hidden="true"></i></button>
      <input v-model="query" v-on:keyup.enter="ytSearch(query)" v-on:input="debouncedSearch(query)" type="search">
    </div>

    <div>
      <ul>
        <li
          v-for="(title, index) in getVideoTitles"
          v-on:click="addToPlaylist(index)">
          <i class="fab fa-youtube youtube-red"></i>
          {{ title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash';

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
      * TODO: Move this to the backend
      * @summary Performs a video look up with the given query
      * @description
      * After clicking the button or pressing enter, this makes a GET request and
      * repopulates the component's results array with the top five results
      * @param {string} query - Query entered by user
      */
      ytSearch: function(query) {
        if (query !== "") {
          this.results = [];
          let searchBar = this;
          $.get(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${query}&key=AIzaSyD-pVsu7hyh4_vhSB5SearFS5BqZJr3kM0`,
            function(data) {
              console.log(data);
              data.items.forEach(function(item) {
                searchBar.results.push(item);
              });
            }
          )
        }
      },

      /**
       * @summary Performs the ytSearch when the user has stopped typing
       * @description
       * When the user is typing, instead of making a request every keypress,
       * set a small delay so that the request only fires when they have stopped
       * typing
       * [Lodash Debounced]{@link https://lodash.com/docs/4.17.5#debounce}
       * @param {function} - Function to call after the wait time
       * @param {number} - Time in miliseconds to wait for
       * @return {function} - The new debounced function
       */
      debouncedSearch: _.debounce(function() {
        this.ytSearch(this.query);
      }, 500),

      /**
       * @summary Emits and passes a YT video object to the parent
       * @description
       * After clicking on one of the search items, the object
       * is sent to the parent to add to the playlist and the results
       * are cleared
       * @param {number} index - Index from this results array
       * @emits Host#newPlaylistItem
       */
      addToPlaylist: function(index) {
        this.$emit("newPlaylistItem", this.results[index]);
        this.clearInputField();
      },

      /**
       * @summary Resets the input field and gets rid of search results
       */
      clearInputField: function() {
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
          return entry.snippet.title;
        });
      }
    }
  }
</script>

<style scoped>
  input {
    font-size: 2em;
    color: #E3E3E3;
    border-width: 0px 0px 1px 0px;
    border-color: #E3E3E3;
    margin-left: 5px;
    background-color: rgba(255, 255, 255, 0.0);
  }

  button {
    cursor: pointer;
  }

  /* TODO: Find out how to attach this to the bottom of the input line */
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  li {
    background-color: #E3E3E3;
    padding: 15px;
    border: 1px solid #222222;
    cursor: pointer;
    width: 100%;
    overflow: hidden;
  }

  .youtube-red {
    color: #FF0000;
  }

  @media screen and (max-width: 768px) {
    button {
      display: none;
    }

    input {
      width: 90%;
    }

  }
</style>
