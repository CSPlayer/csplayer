var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('yt-player', {
    height: '90',
    width: '160',
    videoId: 'M7lc1UVf-VE',
    playerVars: {
        autoplay: '0', // Turns off autoplay
        cc_load_policy: '0', // Do not load closed captions
        disablekb: '0', // Disable the default key controls for videos
        iv_load_policy: '3', // Do not show annotations
        rel: '0' // Do not show related videos after one ends
    }
  });
}

// Keeps track of the video state and button state
var currentlyPlaying;

function playVideo() {
    player.playVideo();
    currentlyPlaying = true;
    updatePlayButton();    
}

function pauseVideo() {
    player.pauseVideo();
    currentlyPlaying = false;
    updatePlayButton();
}

function updatePlayButton() {
    var playButton = document.getElementById("play-button");
    var pauseButton = document.getElementById("pause-button");

    if (currentlyPlaying) {
        playButton.style.display = "none";
        pauseButton.style.display = "inline-block";
    }
    else {
        playButton.style.display = "inline-block";
        pauseButton.style.display = "none";
    }

}

// Event listeners for the search box
var searchButton = document.getElementById("yt-search-button");
var searchInput = document.getElementById("yt-search-input");

searchButton.addEventListener("click", function(e) {
    var query = document.getElementById("yt-search-input").value;
    ytSearch(query);
});

searchInput.addEventListener("keyup", function(e) {
    var key = e.which || e.keyCode;

    if (key === 13) {
        var query = searchInput.value;
        ytSearch(query);
    }
});

// GET request to YouTube's search API
function ytSearch(query){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            // console.log(xhr.responseText);
            displayResults(xhr.responseText);
        }
    }

    xhr.open("GET", `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${query}&key=AIzaSyDrKqjM68bJxjuiKRfxXc4eK9ydh64pGc8`, true);
    xhr.send(null);
}

function displayResults(response) {
    var results = JSON.parse(response);
    var videoIdList = new Array();
    var videoTitleList = new Array();

    results["items"].forEach(function(item) {
        videoIdList.push(item["id"]["videoId"]);
        videoTitleList.push(item["snippet"]["title"]);
    });

    console.log(videoIdList);
    console.log(videoTitleList);
}