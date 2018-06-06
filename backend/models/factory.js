const mongoose = require('mongoose')
const schema = mongoose.Schema

const FactorySchema = new schema({
  name: {
    type: String,
    required: true
  },
  minRange: {
    type: Number,
    required: true
  },
  maxRange: {
    type: Number,
    required: true
  },
  range: {
    type: Number,
    required: true
  },
  children: [Number]
})

const Factory = mongoose.model('factory', FactorySchema)

module.exports = Factory