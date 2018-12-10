require('dotenv').config();
require('moment')
var axios = require('axios');
var keys = require('./keys');
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);
// stores third command line argument as 'command'
var command = process.argv[2];
// stores remaining command line arguments as a space delimited string 'param'
var param = process.argv.splice(3, process.argv.length - 1).join(' ');
console.log('\n')

// executes various options based on input command
switch (command) {

    case 'spotify-this-song':
        // adds default in case of no input
        if (param == '') {
            param = 'ace of base the sign';
        }
        // search spotify for track, displaying info for first result
        spotify.search({
            type: 'track',
            query: param
        }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            console.log('Artist: ' + data.tracks.items[0].artists[0].name);
            console.log('Album:  ' + data.tracks.items[0].album.name);
            console.log('Song:   ' + data.tracks.items[0].name);
            console.log('URL:    ' + data.tracks.items[0].external_urls.spotify);
        });
        break;

    case 'movie-this':
        // Enters default paramater if no input
        if (param == '') {
            param = 'Mr Nobody'
        }
        // Search OMDB with parameters
        axios.get("http://www.omdbapi.com/?t=" + param + "&y=&plot=short&apikey=trilogy")
            .then(function (response) {
                console.log('Title:        ' + response.data.Title);
                console.log('Year:         ' + response.data.Year);
                console.log('IMDB Rating:  ' + response.data.Ratings[0].Value);
                console.log('Tomato-meter: ' + response.data.Ratings[1].Value);
                console.log('Country:      ' + response.data.Country);
                console.log('Plot:         ' + response.data.Plot);
                console.log('Actors:       ' + response.data.Actors);
            });
        break;

    case 'concert-this':
        // Search bandsintown with parameters
        axios.get("https://rest.bandsintown.com/artists/" + param + "/events?app_id=codingbootcamp")
            .then(function (response) {
                console.log(response.data[0].venue.city);
                console.log(moment(response.data[0].datetime).date);
                // console.log('IMDB Rating:  ' + response.data.Ratings[0].Value);
            });

}