const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const playerSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  playerFirstName: {
    type: String,
    required: true
  },

  playerLastName: {
    type: String,
    required: true
  },

  parentFirstName: {
    type: String,
    required: true
  },

  parentLastName: {
    type: String,
    required: true
  },

  parentPhone: {
    type: Number,
    required: true
  },

  playerHeight: {
    type: Number,
    required: true
  },

  playerWeight: {
    type: Number,
    required: true
  },

  playerAge: {
    type: Number,
    required: true
  },

  playerHealthStatus: {
    type: String,
    required: true
  },

  playerSchool: {
    type: String,
    required: true
  },
  //[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?

  playerResidence: {
    type: String, 
    required: true
  },

  playerADM: {
    type: Number,
    required: true,
    unique: true,
  },

  profilePicture: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  }

});
const Player = mongoose.model('Player', playerSchema);
module.exports = Player;