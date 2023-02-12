'use strict'

var mongoose = require('mongoose')

mongoose.set('strictQuery', true)

var connect = async () => {
  await mongoose.connect(process.env.CONNECT_MONGO)
}

module.exports = { connect }