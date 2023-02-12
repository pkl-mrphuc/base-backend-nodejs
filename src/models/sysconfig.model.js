'use strict'

const mongoose = require('mongoose')

const SysConfigSchema = new mongoose.Schema({
    _id: String,
    _key: String,
    _value: String
})

module.exports = SysConfigSchema