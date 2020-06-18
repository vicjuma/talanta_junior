const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const coachSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstName: {
    type: String,
    required: true
  },

  lastName: {
    type: String,
    required: true
  },

  phone: {
    type: Number,
    required: true
  },


  // email: {
  //   type: String,
  //   required: true,
  //   unique: true,
  //   match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  // },
  //[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?

  password: {
    type: String, 
    required: true
  }
});
const Coach = mongoose.model('Coach', coachSchema);
module.exports = Coach;