require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);



var command = process.argv[2];
var userInput = process.argv[3];
if (!userInput) {
    userInput = "The Sign"
}


if (command === 'spotify-this-song') {
    spotify.search({
        type: 'track',
        query: userInput
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var track = data.tracks.items[0];
        var artist = [];
for (i = 0; i < track.artists.length; i++){
    artist.push(track.artists[i].name);
}
        console.log("Artist: " + artist.join(", "));
        console.log("Track: " + track.name);
        console.log("Preview: " + track.preview_url);
        console.log("Album: " + track.album.name);
    });
 
}
