const Enum = require("./models/enum.model")
var userService = require("./services/user.service")

var authMiddleware = async (req, res, next) => {
    if(process.env.HAS_AUTHEN == 'true') {
        let token = req.header('Authorization')
        let isContinue = false
        if(token) { 
            token = token.replace('Bearer ', '')
            let result = await userService.checkAuthenMiddleware(token)
            if(result._success) { 
                req.user = result._data
                req.token = token
                isContinue = true
                next()
            }
            else {
                res.send(result)
            }
        }
        else {
            res.send(userService.logErrorMiddleware(Enum.ErrorCode.EmptyToken))
        }
        
    }
    else {
        next()
    }
}

module.exports = authMiddleware