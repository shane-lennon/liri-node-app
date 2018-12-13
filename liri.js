require('dotenv').config();
var fs = require('fs');
var moment = require('moment');
var axios = require('axios');
var keys = require('./keys');
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);
// stores third command line argument as 'command'
var command = process.argv[2];
// stores remaining command line arguments as a space delimited string 'param'
var param = process.argv.splice(3, process.argv.length - 1).join(' ');
// run liri
liri(command, param);

function liri(command, param) {
    log(command + ': ' + param + '\n');
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
                    return log('Error occurred: ' + err);
                }
                log('Artist: ' + data.tracks.items[0].artists[0].name);
                log('Album:  ' + data.tracks.items[0].album.name);
                log('Song:   ' + data.tracks.items[0].name);
                log('URL:    ' + data.tracks.items[0].external_urls.spotify + '\n');
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
                    log('Title:        ' + response.data.Title);
                    log('Year:         ' + response.data.Year);
                    log('IMDB Rating:  ' + response.data.Ratings[0].Value);
                    log('Tomato-meter: ' + response.data.Ratings[1].Value);
                    log('Country:      ' + response.data.Country);
                    log('Plot:         ' + response.data.Plot);
                    log('Actors:       ' + response.data.Actors + '\n');
                });
            break;

        case 'concert-this':
            // Search bandsintown with parameters
            axios.get("https://rest.bandsintown.com/artists/" + param + "/events?app_id=codingbootcamp")
                .then(function (response) {
                    for (i = 0; i < response.data.length; i++) {
                        if (response.data[i].venue.region == '') {
                            log('Venue:     ' + response.data[i].venue.name);
                            log('Location:  ' + response.data[i].venue.city + ', ' +
                                response.data[i].venue.country);
                            log('Date       ' + moment(response.data[i].datetime).format('L') + '\n');
                        } else {
                            log('Venue:     ' + response.data[i].venue.name);
                            log('Location:  ' + response.data[i].venue.city + ' ' +
                                response.data[i].venue.region + ', ' +
                                response.data[i].venue.country);
                            log('Date       ' + moment(response.data[i].datetime).format('L') + '\n');
                        }
                    }

                });
            break;

        case 'do-what-it-says':
            // opens file random.txt and executes 
            fs.readFile('random.txt', 'utf8', function(error, data) {
                if (error) {
                    return console.log(error)
                }
                //console.log(data);
                var input = data.split(',');
                //console.log(input)
                liri(input[0], input[1])
            });
            break;
        default:
            log('Invalid command. For command usage, see README.md');

    }
}

function log(message) {
    console.log(message);
    fs.appendFile('log.txt', message + '\n', function(err) {
        if (err){
            return console.log(err);
        }
    });
}