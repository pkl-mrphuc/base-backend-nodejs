'use strict'

var sysConfigRouter = require('./modules/sysconfig.router')
var userRouter = require('./modules/user.router')

module.exports = (app) => {
    if(process.env.HAS_AUTHEN == 'true') {
        app.use(userRouter)
    }
    app.use(sysConfigRouter)
}
