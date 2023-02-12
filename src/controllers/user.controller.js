'use strict'

const userService = require("../services/user.service")


exports.login = async (req, res) => {
    let { username, password } = req.body
    res.json(await userService.login(username, password))
}

exports.signup = async (req, res) => {
    let { username, password } = req.body
    res.json(await userService.signup(username, password))
}

exports.logout = async (req, res) => {
    res.json(await userService.logout(req.user))
}