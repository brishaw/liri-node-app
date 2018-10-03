# LIRI Bot
Meet LIRI. LIRI is like iPhone's SIRI. The difference is while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data.

## What will it do?
LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.

 ## How does it work?
1. To retrieve the data that will power this app, requests will be sent to the Bands in Town, Spotify and OMDB APIs.
2. LIRI will use the following Node packages:
    • Node-Spotify-API
    • Axios
    • Moment
    • DotEnv
3. For information about a song a user will use the command line and enter `node liri.js spotify-this-song "99 Red Balloons"` 
   In this case, the song is "99 Red Balloons". Quotation marks are **required** for song titles that contain spaces.
4. For information about a concert a user will use the command line and enter `node liri.js concert-this "Metal Church"` 
   In this example, the band is "Metal Church". Quotation marks are **required** for band names that contain spaces.
5. For information about a movie a user will use the command line and enter `node liri.js movie-this "Herbie Goes Bananas"` 
   In this case, the movie is "Herbie Goes Bananas". Quotation marks are **required** for movie titles that contain spaces.

 ## Who will use this repo or project?
**Anyone** who desperately needs to know the name of an actress or actor in a movie, which year the song *Luka* came out or to see if Garth's Reunion Tour will be anywhere near their hometown. ... ..

 ## What is the goal of this project?
The goal of this project is to learn how to use Node.js, implement different Node packages, use node to retrieve data and produce information pertaining to the user requests.

## Bonus
Using appendFile, a log.txt is generated with each search the user makes, which collects the same information the user enters and receives.