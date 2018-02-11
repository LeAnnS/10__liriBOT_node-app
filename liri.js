require("dotenv").config();
var keys = require("./keys");

// var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);

// -----------------------------------------------
// liri command input
var commandArray = process.argv.slice(3);
var command = commandArray.join(" ");

// Include the request npm package
var request = require("request");
var fs = require("fs");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");

// create a switch statement for the liri command
switch(process.argv[2]) {
	case "movie-this":
       getMovie(command);
       break;
   case "spotify-this-song":
       getMusic(command);
       break;
   case "my-tweets":
       getTweets(command);
       break;
   case "do-what-it-says":
       getFile();
       break;
   default:
       console.log("Specify Command");
}

function getMovie(movie){
	// console.log (movie);

	// if (movie === undefined || movie === "Mr. Nobody");

	// Then run a request to the OMDB API with the movie specified
	var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

	
	// This line is just to help us debug against the actual URL.
	// console.log(queryUrl);

	request(queryUrl, function(error, response, body) {

	  // If the request is successful
	  if (!error && response.statusCode === 200) {

	    // Parse the body of the site and recover needed information
	    console.log("Movie: " + JSON.parse(body).Title, "\nRelease Year: " + JSON.parse(body).Year, "\nIMDB Rating: " + JSON.parse(body).imdbRating, "\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value, "\nCountry: " + JSON.parse(body).Country, "\nLanguage: " + JSON.parse(body).Language, "\nPlot: " + JSON.parse(body).Plot, "\nActors: " + JSON.parse(body).Actors);
	  }
	});
}

function getMusic(song) {
	// console.log (song);

	// user-based authentication using environmental variabvles in keys.js
	var spotify = new Spotify(keys.spotify);
	// console.log (spotify);
	 
	spotify
		.search({ type: 'track', query: song, limit: 20 })
			.then(function(response) {
				var song = response.tracks.items[0];
				console.log("Song Name: " + song.name + 
					"\nArtist Name: " + song.artists[0].name +
					"\nAlbum Name: " + song.album.name +
					"\nPreview Link: " + song.preview_url);
			})
		.catch (function(err) {
			console.log(err);
		});
}


function getTweets() {
	
	// user-based authentication using environment variables in keys.js
	var client = new Twitter(keys.twitter);
	// console.log (client);
 		 
	var params = {
		count: 20,
		screen_name: "CodeTrippr",
	};

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	    console.log("Here are your last 20 tweets:\n"); 
		    for (i=0;i<20;i++) {
	                
	                var created = tweets[i].created_at+"\n";
	                var text = tweets[i].text+"\n";

	                // log(text+created);
	                console.log(created+text+"\n");
	        }
	    } 	
	});

}

function getFile(){
	// read the text file & store the info in the variable "data"
	fs.readFile("random.txt", "utf8", function(error, data) {
		// log errors
		if (error) {
			return console.log(error);
		}
		// print contents of "data" to console
		console.log(data);
			
						
		// ***********************************************
		// ACTUALLY - I WANT THIS TO USE THE TEXT IN THE FILE TO RUN THE COMMAND IN THE FILE
	});
}




