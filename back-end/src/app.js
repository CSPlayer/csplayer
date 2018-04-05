const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

//connect to database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost');
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  console.log("Connection Succeeded");
});

const Party = require('../models/Party');

//create backend app
const app = express();
const server = app.listen(process.env.PORT || 8081);

//create websockets
const io = require('socket.io').listen(server);
const socketEventHandler = require('./socketevent-handler');

//setup middleware
// app.use(morgan('combined'))
app.use(bodyParser.json());
app.use(cors());

/**
 * @summary Creates a party with the provided username and password.
 * @description
 * Accepts post requests on the /register_party route. Expects a json with the
   following data:
   {
      partyName: string,
      partyPassword: string
   }
   On success it will send back the party name. Otherwise it will send a json
   with an error message in it. ex: { error: string }
 * @listens Server#register_party_route
 * @emits JSON
 */
app.post('/register_party', (req, res) => {
  var name = req.body.partyName;
  var password = req.body.partyPassword;

  //check if both name and password fields are not empty
  if(!name || !password) {
    res.status(400).send({error : "Must provide a partyName and partyPassword."});
    return;
  }

  //look up provided party name
  var result = Party.find({partyName: name}).exec((err, party) => {
    if (err) {
      res.status(500).send({error: "Encountered database error while checking if party exists. Please try again at a later time."});
      return;
    }

    //return error if party with that name already exists
    if (party.length != 0){
      res.status(200).send({error: "A party with that name already exists."});
      return;
    }

    //otherwise create new party object to store in db
    var newParty = new Party({
      partyName: name,
      partyPassword: password,
      guests: [[]]
    })

    //save newly created party object
    newParty.save((err, newParty) => {
      if (err) {
        res.status(500).send({error: "Encountered a database error while checking if the party exists. Please try again at a later time."});
        return;
      }

      //send back partyname to indicate success
      res.status(200).send({partyName: name});
    })

  })
})

/**
 * @summary registers a guest with the provided username and password.
 * @description
 * Accepts post requests on the /register_guest route. Expects a json with the
   following data:
   {
      partyName: string,
      partyPassword: string
   }
   On success it will send back the party name and the guests guestID. Otherwise
   it will send a json with an error message in it. ex: { error: string }
 * @listens Server#register_guest_route
 * @emits JSON
 */
app.post('/register_guest', (req, res) => {
  var name = req.body.partyName;
  var password = req.body.partyPassword;

  //check if both name and password fields are not empty
  if(!name || !password) {
    res.status(400).send({error : "Must provide a partyName and partyPassword"});
    return;
  }

  //validate that there is a party with that name and password
  var result = Party.findOne({partyName: name, partyPassword: password}).exec((err, party) => {
    if (err) {
      res.status(500).send({error: "Encountered database error while checking if party exists. Please try again at a later time."});
      return;
    }

    //if not, then tell the user they provided invalid creditenals
    if (!party){
      res.status(200).send({error: "Invalid partyName or partyPassword"});
      return;
    }

    //otherwise add guest data to the database
    party.guests.push([])
    party.save((err, result) => {
      if (err) {
        res.status(500).send({error: "Encountered database error while adding guest. Please try again at a later time."});
        return;
      }

      //send back json with partyName and the registered guests guestID.
      res.status(200).send({PartName: name, guestID: result.guests.length - 1});
    })
  })
})

//enable socket-io
io.on("connection", function(socket) {
  console.log("Connected");
  socketEventHandler.handle(socket);
});
