const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost')
var db = mongoose.connection
db.on("error", console.error.bind(console, "connection error"))
db.once("open", function(callback){
  console.log("Connection Succeeded")
});

var Party = require('../models/Party')

const app = express();
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.post('/register_party', (req, res) => {
  var name = req.body.partyName
  var password = req.body.partyPassword

  if(!name || !password) {
    res.status(400).send({error : "Must provide a json containing a partyName and partyPassword"})
    return
  }

  var result = Party.find({partyName: name}).exec((err, party) => {
    if (err) {
      res.status(500).send({error: "Encountered database error while checking if party exists"})
      return
    }

    if (party.length != 0){
      res.send({error: "A party with that name already exists!"})
      return
    }

    var newParty = new Party({
      partyName: name,
      partyPassword: password,
      guests: [[]]
    })

    newParty.save((err, newParty) => {
      if (err) {
        res.status(500).send({error: "Encountered database error while checking if party exists"})
        return
      }

      res.status(200).send({partyName: name})
    })

  })
})

app.post('/register_guest', (req, res) => {
  var name = req.body.partyName
  var password = req.body.partyPassword

  if(!name || !password) {
    res.status(400).send({error : "Must provide a json containing a partyName and partyPassword"})
    return
  }

  var result = Party.findOne({partyName: name, partyPassword: password}).exec((err, party) => {
    if (err) {
      res.status(500).send({error: "Encountered database error while checking if party exists"})
      return
    }

    if (!party){
      res.send({error: "Invalid partyName or partyPassword"})
      return
    }

    party.guests.push([])
    party.save((err, result) => {
      if (err) {
        res.status(500).send({error: "Encountered database while adding guest"})
        return
      }

      res.status(200).send({PartName: name, guestID: result.guests.length - 1})
    })
  })
})

app.listen(process.env.PORT || 8081)
