const mongoose = require('mongoose')

const CollTaskSchema = require('../schemas').CollTaskSchema

const CollTask = mongoose.model('CollTask', CollTaskSchema)

module.exports = {
  CollTask: CollTask
}
