var doitenv = require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var request = require("request");
//

var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


var command = process.argv[2];
var input = process.argv[3];




  if (command === 'my-tweets') {
    twitterFunc()

  }

//========================tweeter condtion ====================
if (command === 'movie-this') {
input = process.argv;
var mynewMovie_input = "";
 for (var i = 3; i < input.length; i++) {
    mynewMovie_input= mynewMovie_input + " " + input[i];
 };
   input =mynewMovie_input
   // console.log(input)
    omdbFunction()
};
//-----------------------------------------------


//=========spotify condition ==========================
if (command === "spotify-this-song") {
  input = process.argv;
  var mynew_input = "";
  for (var i = 3; i < input.length; i++) {
    mynew_input = mynew_input + " " + input[i];

  };
  input = mynew_input
  console.log(input)
  spotifyFunc()
};
//========================do it condtion===================
if (command === 'do-what-it-says') {
  doItFunc()

};

//====================================================


//---------------------------------
function spotifyFunc(input) {
  spotify.search({
    type: 'track',
    query: input,
    limit: 10
  }, function(err, data) {
    console.log(input)
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    for (let i = 0; i < 10; i++) {
      var musicResult =data.tracks.items;
      var song_name = data.tracks.items[0].name;
      var artist_name = data.tracks.items[0].artists[0].name;
      var album_name = data.tracks.items[0].album.name
      var linkto_song = data.tracks.items[0].external_urls.spotify;

    };
    console.log("===============================================")
    console.log("");
    console.log("The song's name is :" + " " + song_name);
    console.log("Artist(s) :") //
    console.log(artist_name);
    console.log("");
    console.log("The Album that song is from")
    console.log(album_name);
    console.log("");
    console.log("A preview link of the song from Spotify")
    console.log(linkto_song);
    console.log("===============================================")

  });


};



//===========================================Tweeter function =======================


function twitterFunc() {
  var params = {
    screen_name: 'iamcardib'
  }; // change screen name to the actual tweeter name - cardi bi
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    console.log("\n======================================================================================================\n");
    console.log("*********************Here are you most recent 20 tweets******************")
    console.log("");
    console.log("");

    if (!error) {
      for (var i = 0; i < tweets.length; i++) {
        console.log(tweets[i].text);

      }
      console.log("\n====================================================================================================\n");
      console.log("");
      console.log("");

    }
  });
}




//=======================================================================MOVIE API FUNCION


function omdbFunction(){

var queryUrl = "http://www.omdbapi.com/?t="+input+ "&y=&plot=short&apikey=trilogy";



// console.log(queryUrl);


request(queryUrl, function(error, response, body) {

  // If the request is successful
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    // console.log(JSON.parse(body))
    // console.log("Release Year: " + JSON.parse(body).Released);
    // console.log(JSON.parse(body));
    console.log(JSON.parse(body).Title)
    console.log("Release Year: " + JSON.parse(body).Released);
    console.log("Rotten Tomatoes Rating is  : "+JSON.parse(body).Ratings[1].Value)
    console.log("Country where the movie was produced is : "+JSON.parse(body).Country)
    console.log("Language of the movie is : " +JSON.parse(body).Language)
    console.log("Plot of the movie is : " + JSON.parse(body).Plot)
    console.log("Actors in the movie are " + JSON.parse(body).Actors)
  }
});


};





//==================DO IT function ======================================================
function doItFunc(result,error){
// console.log(" DO IT FUNCION TEST")

fs.readFile("random.txt", "utf8", function(error, data){
if (error) {
  return console.log(error);
}

  var output = data.split(",");

  for (var i = 0; i < output.length; i++) {
    console.log(output[i]);
};

var do_command = output[0];
var do_input= output[1];

spotifyFunc(do_input)
//

});


};
