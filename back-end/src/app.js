const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

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
