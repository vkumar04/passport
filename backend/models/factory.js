const mongoose = require('mongoose')
const schema = mongoose.Schema

const FactorySchema = new schema({
  name: {
    type: String,
    required: true
  },
  numbers: [Number]
})

const Factory = mongoose.model('factory', FactorySchema)

module.exports = Factory