const express = require('express')
const userController = require('../../controllers/user.controller')
const authenMiddleware = require('../../middleware')

const userRouter = express.Router()

userRouter.post('/api/users/login', userController.login)
userRouter.post('/api/users/signup', userController.signup)
userRouter.get('/api/users/logout', authenMiddleware, userController.logout)

module.exports = userRouter