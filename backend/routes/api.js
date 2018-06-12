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

router.patch('/:id', (req, res, next) => {
  Factory.findOne({_id: req.params.id}, (err, factory) => {
    if (err) {
      return res.send(err)
    }

    for (prop in req.body) {
      factory[prop] = req.body[prop];
    }

    factory.save(err => {
      if (err) {
        return res.send(err)
      }
      res.json({message: 'factory updated'})
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