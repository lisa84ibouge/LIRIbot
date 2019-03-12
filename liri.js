require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var request = require('request');
var fs = require('fs');

var command = process.argv[2];
var userInput = process.argv[3];



var getMovie = function (movieName) {

    request('http://www.omdbapi.com/?i=tt3896198&apikey=4f4c3893&t=' + encodeURIComponent(movieName) + '&y=&plot=short&r=json&', function (error, response, body) {
    console.log(error); 
           console.log(body);
    if (!error && response.statusCode === 200) 
{
        
                var jsonData = JSON.parse(body);
                
                console.log('Title ' + jsonData.Title);
                console.log('Year ' + jsonData.Year);
                console.log('Rated: ' + jsonData.Rated);
                console.log('IMDB Rating: ' + jsonData.imdbRating);
                console.log('Country of Production: ' + jsonData.Country);
                console.log('Language of Movie: ' + jsonData.Language);
                console.log('Plot of the movie: ' + jsonData.Plot);
                console.log('Actors in the movie' + jsonData.Actors);
                //console.log('Rotten Tomatoes URL: ' + jsonData.tomatoURL);
                //console.log('Rotten Tomatoes Rating: ' + jsonData.tomatoRating);
                console.log('-------------------------------------------------')
            }
        }

    
    )
        
};


var getConcert = function (artistName){
    request("https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp", function (error, response, body){
    var eventsArray = JSON.parse(body)
        for (i = 0; i < eventsArray.length; i++) {
            console.log('Venue Name: '+ eventsArray[i].venue.name)
            console.log('Date: '+ eventsArray[i].datetime)
            console.log('Location: '+ eventsArray[i].venue.city)
            console.log('___________________________________')
        }
        

    } )
    
}


pick = function(command, userInput)  {

if (command === 'spotify-this-song') {
    if (!userInput) {
        userInput = "Ace of Base The Sign"
    } 
    
    spotify.search({
        type: 'track',
        query: userInput 
        
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var track = data.tracks.items[0];
        var artist = [];
        for (i = 0; i < track.artists.length; i++) {
            artist.push(track.artists[i].name);
        }
        console.log("Artist: " + artist.join(", "));
        console.log("Track: " + track.name);
        console.log("Preview: " + track.preview_url);
        console.log("Album: " + track.album.name);
    });

} 
else if (command === "movie-this"){
    if (!userInput) {
        userInput = "Mr. Nobody"
    }
    getMovie(userInput)
}

if (command === "concert-this") {
    if (!userInput) {
        userInput = "Beck"
    } 
     getConcert(userInput);
    }
if (command === "do-what-it-says"){
  fs.readFile('random.txt', 'utf8', function (err, data){

      if (err) throw err;

      var dataArr = data.split(',');
        console.log(dataArr[0]);
      if (dataArr.length == 2) {
          pick(dataArr[0], dataArr[1]);
      } else if (dataArr.length == 1){
          pick(dataArr[0]);
      }
  });
}}
pick(command, userInput);
