const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const routes = require('./routes/api')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const db = require('./config/db')
const helmet = require('helmet')
const path = require('path')

const app = express()
app.use(express.static('../frontend/'))

app.use(cors())

app.use(helmet())

//connect to mlab url
mongoose.connect(db.mongoURI)
//convert body to json
app.use(bodyParser.json())
//url encoded
app.use(bodyParser.urlencoded({ extended: false}));
//morgan
app.use(morgan('dev'))
//use routes with /api
app.use('/api', routes)

app.use((err, req, res, next) => {
  res
    .status(422)
    .send({error: err.message})
})

app.get('/*', (req,res) => {
  res.sendfile(path.resolve(__dirname, '../frontend/','index.html'))
})
//port 3000
const port = process.env.port || 5000

app.listen(port, (req, res) => {
  console.log(`server running on http://localhost:${port}`)
})