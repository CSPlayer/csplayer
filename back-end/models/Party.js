var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var partySchema = new Schema({
  partyName : {type: String, required: true},
  partyPassword: {type: String, required: true},
  memberCount: {type: Number, required: true},
  playlist: []
});

var Party = mongoose.model("Party", partySchema);
module.exports = Party;
