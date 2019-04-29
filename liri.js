require('dotenv').config();
const axios = require("axios");
const fs = require('fs');
const Spotify = require("node-spotify-api");
const moment = require('moment');
const inquirer = require("inquirer");
const keys = require("./keys.js");

let inputName = '';
// const spotify = new Spotify(keys.spotify)


inquirer.prompt([{
  type: 'list',
  message: 'Welcome to LIRI. Start your search. ',
  choices: ['Concert me', 'Song me', 'Movie me', 'Get Weird'],
  name: 'command'
  
},

{
  type: "input",
  message: "Type in what you want to search or keep it blank and hit enter.",
  name: "userInput"
}
])  .then(function(response) {
  let command = response.command;
  inputName = response.userInput;

  if (command === "Song me") {
    songMe();
  } else if (command === "Movie me") {
    movieMe();
  } else if (command === "Concert me") {
    concertMe();
  } else if (command === "Get Weird") {
    doThis();
  }

})

// spotify-this-song
//////////////////////////////////////////

const songMe = function () {
  if (!inputName) {
    inputName = "The Ace of Base"
  }

  let spotify = new Spotify(keys.spotify);

  spotify.search({ type: 'track', query: inputName }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log('\n===========================================================================\n');
    console.log('Spotify Results')
    console.log('\n===========================================================================\n');
    let spotifyInfo = data.tracks.items;

    console.log('Artist: ' + spotifyInfo[0].artists[0].name);
    console.log('Song: ' + spotifyInfo[0].name);
    console.log('Album: ' + spotifyInfo[0].album.name)
    console.log('Listen on Spotify: ' + spotifyInfo[0].external_urls.spotify);
    console.log('\n===========================================================================\n');
    });
  };

  // movie-this
//////////////////////////////////////////

const movieMe = function () {
  if (!inputName) {
    inputName = "Mr Nobody"
  }

  let movQueryUrl = 'http://www.omdbapi.com/?t=' + inputName + '&y=&plot=short&apikey=b7c2bbab';

  axios.get(movQueryUrl).then(
    function(response) {
      console.log('\n===========================================================================\n');
      console.log('OMDB Results')
      console.log(movQueryUrl);
      console.log('Movie Title: ' + response.data.Title);
      console.log('Release Year: ' + response.data.Year);
      console.log('IMDB Rating: ' + response.data.Ratings[0].Value);
      console.log('Rotten Tomatoes Rating: ' + response.data.Ratings[1].Value );
      console.log('Produced in (country): ' + response.data.Country );
      console.log('Language: ' + response.data.Language);
      console.log('Plot: ' + response.data.Plot);
      console.log('Actors: ' + response.data.Actors);
      console.log('\n===========================================================================\n');
    });
  }

  // concert-this
///////////////////////////////////////////

const concertMe = function () {
  if (!inputName) {
    inputName = "Brockhampton"
  } 

  let QueryUrl = 'https://rest.bandsintown.com/artists/' + inputName + '/events?app_id=d77f85db82462723b41961256b5b9fc1';

  axios.get(QueryUrl).then(
    function(response) {
      console.log('\n===========================================================================\n');
      console.log('BANDS IN TOWN');
      console.log('\n===========================================================================\n');
      console.log(QueryUrl);

      let concerts = response.data;
      for (var i in concerts) {
        console.log('Line-Up: ' + concerts[i].lineup);
        console.log('Venue Name: ' + concerts[i].venue.name);
        console.log('Venue Location: ' + concerts[i].venue.city + ' ' + concerts[i].venue.region + ' ' + concerts[i].venue.country);
        let eventTimeRaw = concerts[i].datetime;
        let eventTime = moment(eventTimeRaw, 'YYYY-MM-DDThh:mm').format('LLLL');
        console.log('Event Date: ' + eventTime);
        console.log(' . . . ');
      }

      console.log('\n===========================================================================\n');
      }
    );
  };

  // const doMe = function (response) {
  //   fs.readFile("./random.txt", "utf8", function (err, data) {
  //     if (err) throw err;
  
  //     let output = data.split(',');
  //     let a = output[0];
  //     let b = output[1];
  
  //     if (a === 'spotify-this-song') {
  //     inputName = b;
  //     songMe();
  //     } else if (a === 'movie-me') {
  //     inputName = b;
  //     movieMe();
  //     } else if (a === 'concert-me') {
  //     inputName = b;
  //     concertMe();
  //     }
  
  //   });
  // }

  //Function for random.txt file
  const doThis = function (response) {
    fs.readFile("./random.txt", "utf8", function (err, data) {
      if (err) throw err;
      console.log(data);
      
  
      let output = data.split(',');
      let a = output[0];
      let b = output[1];
  
      if (a === 'spotify-this-song') {
      inputName = b;
      songMe();
      } else if (a === 'movie-this') {
      inputName = b;
      movieMe();
      } else if (a === 'concert-this') {
      inputName = b;
      concertMe();
      }
  
    });

  }
// console.log(search);

// function spotifySearch() {
//   spotify
//   .search({ type: 'track', query: search, 
// limit: 10 })
//   .then(function(response) {
//     console.log(response);
//   })
//   .catch(function(err) {
//     console.log(err);
//   });


// }

// spotify
//   .search({ type: 'track', query: search, 
// limit: 10 })
//   .then(function(response) {
//     console.log(response);
//   })
//   .catch(function(err) {
//     console.log(err);
//   });

//   bandsintown
//   .getArtistEventList("Skrillex")
//   .then(function(events) {
//       console.log(events);
      
//     // return array of events
//   });


// axios.get("")
// .then(function(response) {
    
//     console.log(response);

// })
// .catch(function(error) {
    
//     console.log(error);
    
// });


