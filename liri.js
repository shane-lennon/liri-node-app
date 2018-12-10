require('dotenv').config();
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

}