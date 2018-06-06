const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const routes = require('./routes/api')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const db = require('./config/db')

const app = express()
app.use(cors())
//connect to mlab url
mongoose.connect(db.mongoURI)
//convert body to json
app.use(bodyParser.json())
//morgan
app.use(morgan('dev'))
//use routes with /api
app.use('/api', routes)

app.use((err, req, res, next) => {
  res
    .status(422)
    .send({error: err.message})
})
//port 3000
const port = process.env.port || 3000

app.listen(port, (req, res) => {
  console.log(`server running on https://localhost:${port}`)
})