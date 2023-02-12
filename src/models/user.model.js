'use strict'

const mongoose = require('mongoose')
const Enum = require('./enum.model')

const UserSchema = new mongoose.Schema({
    _id: { type: String },
    _username: { type: String, required: [true, Enum.ErrorCode.NotEmpty], min: 1, max: 20 },
    _password: { type: String, required: [true, Enum.ErrorCode.NotEmpty], min: 8, max: 20 },
    _token: { type: String, default: null }
})

module.exports = UserSchema