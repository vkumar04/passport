const express = require('express')
const router = express.Router()
const Factory = require('../models/factory')

router.get('/', (req, res) => {
  Factory
    .find({})
    .then((factory) => {
      res.send(factory)
    })
})

router.post('/', (req, res, next) => {
  Factory
    .create(req.body)
    .then((factory) => {
      res.send(factory)
    })
    .catch(next)
})

router.put('/:id', (req, res, next) => {
  Factory.findByIdAndUpdate({
    _id: req.params.id
  }, req.body).then((factory) => {
    Factory.findOne({
      _id: req.params.id
    }, (ninja) => {
      res.send(factory)
    })
  })
})

router.delete('/:id', (req, res, next) => {
  Factory
    .findByIdAndRemove({_id: req.params.id})
    .then((factory) => {
      res.send(factory)
    })
})

module.exports = router