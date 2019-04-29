require('dotenv').config();
const axios = require("axios");
const Spotify = require("node-spotify-api");
const bandsintown = require('bandsintown');
const inquirer = require("inquirer");
const keys = require("./keys.js");

let inputName = '';
// const spotify = new Spotify(keys.spotify)


inquirer.prompt([{
  type: 'list',
  message: 'Options: ',
  choices: ['Concert-me', 'Song-me', 'Movie-me', 'Do-it!'],
  name: 'command'
  
},

{
  type: 'input',
  message: 'What would you like to search? Keep it blank and hit enter if you got the time.',
  name: 'userInput'
}
])  .then(function(response) {
  let command = response.command;
  inputName = response.userInput;

  if (command === 'Concert-me') {
    concertMe();
  } else if (command === 'Song-me') {
    songMe();
  } else if (command === 'Movie-me') {
    movieMe();
  } else if (command === 'Do-it!') {
    doMe();
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
    console.log('\n===================\n')
    let spotifyInfo = data.tracks.items;

    console.log('Artist: ' + spotifyInfo[0].artists[0].name);
    console.log('Song Name: ' + spotifyInfo[0].name);
    console.log('Album Name: ' + spotifyInfo[0].album.name)
    console.log('Link to Spotify: ' + spotifyInfo[0].external_urls.spotify);
    });
  };