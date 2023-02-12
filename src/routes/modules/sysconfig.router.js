'use strict'

const sysConfigController = require('../../controllers/sysconfig.controller')
const express = require('express')
const authMiddleware = require('../../middleware')

const sysConfigRouter =  express.Router()

sysConfigRouter.get('/api/systemconfigs', authMiddleware, sysConfigController.getAll)

module.exports = sysConfigRouter

