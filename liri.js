
require("dotenv").config();

var fs = require("fs");

var keys = require("./keys.js");

var Spotify = require("node-spotify-api");

var axios = require("axios");

var moment = require('moment');

var spotify = new Spotify(keys.spotify);

var command = process.argv[2];

var songName = process.argv[3];

var bitArtist = process.argv[3];

var movie = process.argv[3];

var logStart = "\n] LIRI BOT [\n";

var logEnd = "\n] -******** e n d ********- [\n";

switch (command) {

    case "concert-this":

        if(bitArtist == null) {

            var text = (logStart + command + " :: " + bitArtist + "\n" + "I'm sorry nobody is playing in your neighborhood, please try your search again..." + logEnd);

            console.log("I'm sorry nobody is playing in your neighborhood, please try your search again...");

            fs.appendFile("log.txt", text, function(err) {

                if(err) {

                    console.log(err);

                } else {

                    console.log("Liri Log has been updated...");

                }

            })

        } else {

        axios.get("https://rest.bandsintown.com/artists/" + bitArtist + "/events?app_id=codingbootcamp")

        .then(function(response){
                
                console.log(bitArtist + " is playing at the...");

                console.log("Name of the venue: " + response.data[0].venue.name);

                console.log("Location: " + response.data[0].venue.city);

                console.log("Date of event: " + moment(response.data[0].datetime).format("MM/DD/YYYY"));

                var text = [logStart + command + " :: " + bitArtist + "\n" + "Name of the venue: " + response.data[0].venue.name + "\n" + "Location: " + response.data[0].venue.city + "\n" + "Date of event: " + moment(response.data[0].datetime).format("MM/DD/YYYY") + logEnd];

                fs.appendFile("log.txt", text, function (err) {

                    if (err) {

                        console.log(err);

                    } else {

                        console.log("Liri Log has been updated...");
                    }

                });

            },
                function (error) {
                    
                    if (error.response) {
                        
                        console.log(error.response.data);

                        console.log(error.response.status);

                        console.log(error.response.headers);

                    } else if (error.request) {

                        console.log(error.request);

                    } else {
    
                        console.log('Error', error.message);

                    }

                    console.log(error.config);
                }
            )
        }

        break;
        
    case "spotify-this-song" :

        if (songName == null) {

            if (command) {

                spotify.request('https://api.spotify.com/v1/tracks/3DYVWvPh3kGwPasp7yjahc')

                    .then(function (data) {

                        var artists = data.artists[0].name;

                        var songTitle = data.name;

                        var songUrl = data.preview_url;

                        var songAlbum = data.album.name;

                        console.log("Artist(s): " + data.artists[0].name);

                        console.log("The Song's Name: " + data.name);

                        console.log("Spotify Preview Link: " + data.preview_url);

                        console.log("Album: " + data.album.name);

                        var text = [logStart + process.argv[2] + " :: " + process.argv[3] + "\n" + "Artist(s): " + artists + "\n" + "The Song's Name: " + songTitle + "\n" + "Spotify Preview Link: " + songUrl + "\n" + "Album: " + songAlbum + logEnd];

                        fs.appendFile("log.txt", text, function (err) {

                            if (err) {

                                console.log(err);

                            }

                            else {

                                console.log("Liri Log has been updated...");
                            }

                        });

                    })

                    .catch(function (err) {

                        console.error('Error occurred: ' + err);

                    });
            }

        } else {

            if (command) {

                spotify.search({

                    type: "track",

                    query: songName,

                    limit: 10
                },

                function (err, data) {

                    if (err) {

                        console.log('Error occurred: ' + err);

                        return;  

                    } else {

                        var songInfo = data.tracks.items[0];

                        var artists = songInfo.artists[0].name;

                        var songTitle = songInfo.name;

                        var songUrl = songInfo.preview_url;

                        var songAlbum = songInfo.album.name;

                        console.log("Artist(s): " + artists);

                        console.log("The Song's Name: " + songInfo.name);

                        console.log("Spotify Preview Link: " + songInfo.preview_url);

                        console.log("Album: " + songInfo.album.name);
                        
                        // var text = [logStart + process.argv[2] + " :: " + process.argv[3] + "\n" + "Artist(s): " + artists + "\n" + "The Song's Name: " + songTitle + "\n" + "Spotify Preview Link: " + songUrl + "\n" + "Album: " + songAlbum + logEnd];

                        fs.appendFile("log.txt", text, function (err) {

                            if (err) {

                                console.log(err);

                            }

                            else {

                                console.log("Liri Log has been updated...");
                            }

                        });
                    };
                })
            };
        }

        break;

    case "movie-this" :
        
        if (movie == null) {

            axios.get("https://omdbapi.com/?t=mr.nobody&apikey=trilogy")

                .then(function (resp) {
                    //console.log(resp.data);
                    console.log("Movie Title: " + resp.data.Title);
                    console.log("Year Released: " + resp.data.Year);
                    console.log("IMDB Rating: " + resp.data.imdbRating);
                    console.log("Rotten Tomatoes Rating: " + resp.data.Ratings[1].Value);
                    console.log("Country Produced: " + resp.data.Country);
                    console.log("Language of the Movie: " + resp.data.Language);
                    console.log("Movie Plot: " + resp.data.Plot);
                    console.log("Movie Actors: " + resp.data.Actors);

                    var text = [logStart + process.argv[2] + " :: " + process.argv[3] + "\n" + "Movie Title: " + resp.data.Title + "\n" + "Year Released: " + resp.data.Year + "\n" + "IMDB Rating: " + resp.data.imdbRating + "\n" + "Rotten Tomatoes Rating: " + resp.data.Ratings[1].Value + "\n" + "Country Produced: " + resp.data.Country + "\n" + "Language of the Movie: " + resp.data.Language + "\n" + "Movie Plot: " + resp.data.Plot + logEnd];

                    fs.appendFile("log.txt", text, function (err) {

                        if (err) {

                            console.log(err);

                        }

                        else {

                            console.log("Liri Log has been updated...");
                        }

                    });

                }, function (error) {

                    if (error.resp) {
                        
                        console.log(error.resp.data);
                        console.log(error.resp.status);
                        console.log(error.resp.headers);

                    } else if (error.request) {
                       
                        console.log(error.request);

                    } else {
                        
                        console.log('Error', error.message);
                    }
                        console.log(error.config);
                })

        } else {

            axios.get("https://omdbapi.com/?t=" + movie  + "&apikey=trilogy")
            
            .then(function(resp) {
            
                console.log("Movie Title: " + resp.data.Title);
                console.log("Year Released: " + resp.data.Year);
                console.log("IMDB Rating: " + resp.data.imdbRating);
                console.log("Rotten Tomatoes Rating: " + resp.data.Ratings[1].Value);
                console.log("Country Produced: " + resp.data.Country);
                console.log("Language of the Movie: " + resp.data.Language);
                console.log("Movie Plot: " + resp.data.Plot);
                console.log("Movie Actors: " + resp.data.Actors);

                //var text = [logStart + process.argv[2] + " :: " + process.argv[3] + "\n" + "Movie Title: " + resp.data.Title + "\n" + "Year Released: " + resp.data.Year + "\n" + "IMDB Rating: " + resp.data.imdbRating + "\n" + "Rotten Tomatoes Rating: " + resp.data.Ratings[1].Value + "\n" + "Country Produced: " + resp.data.Country + "\n" + "Language of the Movie: " + resp.data.Language + "\n" + "Movie Plot: " + resp.data.Plot + logEnd];

                fs.appendFile("log.txt", text, function (err) {

                    if (err) {

                        console.log(err);

                    }

                    else {

                        console.log("Liri Log has been updated...");
                    }

                });

            }, function(error) {

                if (error.resp) {
                    
                    console.log(error.resp.data);
                    console.log(error.resp.status);
                    console.log(error.resp.headers);

                } else if (error.request) {
                
                    console.log(error.request);

                } else {
                    
                    console.log('Error', error.message);

                }

                console.log(error.config);
            })
        }

    break;

    case "do-what-it-says" :
        fs.readFile("random.txt", "utf8", function (error, data) {

            if (error) {
                return console.log(error);
            }

            var dataArr = data.split(",");

            var song = dataArr[1];

            spotify.search({

                type: "track",

                query: song,

                limit: 1
            },

            function (err, data) {

                if (err) {

                    console.log('Error occurred: ' + err);

                    return;

                } else {

                    var songInfo = data.tracks.items[0];

                    var artists = songInfo.artists[0].name;

                    var songTitle = songInfo.name;

                    var songUrl = songInfo.preview_url;

                    var songAlbum = songInfo.album.name;

                    console.log("Artist(s): " + artists);

                    console.log("The Song's Name: " + songInfo.name);

                    console.log("Spotify Preview Link: " + songInfo.preview_url);

                    console.log("Album: " + songInfo.album.name);

                    var text = [logStart + process.argv[2] + " :: " + artists + "\n" + "The Song's Name: " + songTitle + "\n" + "Spotify Preview Link: " + songUrl + "\n" + "Album: " + songAlbum + logEnd];

                    fs.appendFile("log.txt", text, function (err) {

                        if (err) {

                            console.log(err);

                        }

                        else {

                            console.log("Liri Log has been updated...");

                        }

                    });

                };

            })
            
        });
        
    break;

    default : 

        console.log("I'm so sorry, but your search returned no valuable results...");
    
} // end switch

