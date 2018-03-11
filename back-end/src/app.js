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
  res.send({message: 'Party was successfully registered!'})
})

app.post('/register_guest', (req, res) => {
  res.send({message: 'Guest was successfully registered!'})
})

app.listen(process.env.PORT || 8081)
