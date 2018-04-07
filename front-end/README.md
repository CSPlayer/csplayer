# CSPlayer Frontend

This directory holds the views, components, and static assets served to the users. The Host.vue and Guest.vue components represent the primary page users will be interacting with. Communication with the backend is done via the Axios HTTP library (for registering and joining parties) and socket-io.

The general pattern for communication in this project is the top level component (either Host.vue or Guest.vue, whichever role the user is) is responsible for communicating with the backend. If a child component needs to make a call, it will emit an event to the current top-level component and the top-level component will handle the request either using HTTP requests or websockets, then pass the results down as a prop. 


## Frameworks and Libraries
**[Vue.Js](https://vuejs.org/)**

The main frontend framework responsible for updating the page and handling user input

**[Socket-io](https://socket.io/)**

Emits user events such as upvotes or downvotes to the server and listens for changes to the state of a room

**[Axios](https://github.com/axios/axios)**

HTTP client used to make requests to the backend

**[Lodash](https://lodash.com/)**

Handy Javascript library that includes a debounce function that is used in this project


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## Relevant Links
- [Backend Repo](https://github.com/CSPlayer/csplayer/tree/develop/back-end)
- [YouTube API](https://developers.google.com/youtube/)
