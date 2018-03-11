var mongoose = require('mongoose')
var Schema = mongoose.Schema

var partySchema = new Schema({
  partyName : {type: String, required: true},
  partyPassword: {type: String, required: true},
  guests: [[{
      songName: String,
      songUrl: String,
      vote: Number
  }]]
})

var Party = mongoose.model("Party", partySchema);
module.exports = Party;
