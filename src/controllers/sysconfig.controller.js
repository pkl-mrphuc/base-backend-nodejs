'use strict'

var sysConfigService = require('../services/sysconfig.service')

exports.getAll = async (req, res) => {
    res.json(await sysConfigService.getAll())
}