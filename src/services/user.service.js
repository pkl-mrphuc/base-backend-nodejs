const UserSchema = require('../models/user.model')
const ServiceResult = require('../models/serviceresult.model')
const BaseMongoService = require('../services/mongo/base.service')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid')
const Enum = require('../models/enum.model')
const logger = require('../models/logger.model');

class UserService extends BaseMongoService{

    constructor(nameModel, schemaModel) {
        super(nameModel, schemaModel)
    }

    async login(username, password) {
        let res = new ServiceResult()
        try {
            let user = await this.findByCredentials(username, password)
            if (!user) {
                res.setError(Enum.ErrorCode.UserLoginFail)
            }
            else {
                let token = this.generateToken(user)
                await this.saveNewToken(user, token)
                res.setData(token)
            }

        } catch (error) { 
            res.setError(error) 
            logger.error(new Error('METHOD: Login'))
        }

        return res
    }

    async checkAuthenMiddleware(token) {
        let res = new ServiceResult()
        try {
            let decryptToken = jwt.verify(token, process.env.LOGIN_KEY)
            let user = await this._model.findOne({ _id: decryptToken._id, _token: token })
            if (!user) {
                res.setError(Enum.ErrorCode.UserLoginFail)
            }
            else { res.setData(user) }

        } catch (error) { 
            res.setError(error) 
            logger.error(new Error('METHOD: CheckAuthenMiddleware'))
        }

        return res

    }

    logErrorMiddleware(error) {
        let res = new ServiceResult()
        res.setError(error)
        return res
    }

    generateToken(user) {
        let token = null
        try {

            token = jwt.sign({ _id: user._id }, process.env.LOGIN_KEY, { expiresIn: '2h' })

        } catch (error) { 
            logger.error(new Error('METHOD: GenerateToken'))
        }
        return token
    }

    async saveNewToken(user, token) {
        try {

            await this._model.updateOne({ _id: user._id }, { _token: token })

        } catch (error) {
            logger.error(new Error('METHOD: SaveNewToken'))
        }
    }

    async findByCredentials(username, password) {
        let user = null
        try {
            user = await this._model.findOne({ _username: username })
            if (user) {
                let isPasswordMatch = await bcrypt.compare(password, user._password)
                if (!isPasswordMatch) {
                    user = null
                }
            }

        } catch (error) { 
            user = null 
            logger.error(new Error('METHOD: FindByCredentials'))
        }
        return user
    }

    async signup(username, password) {
        let res = new ServiceResult()
        try {
            
            password = await bcrypt.hash(password, 8)
            await this._model.collection.insertOne({ _id: uuidv4(), _username: username, _password: password, _token: "" })

        } catch (error) { 
            res.setError(error) 
            logger.error(new Error('METHOD: SignUp'))
        }
        return res
    }

    async logout(user) {
        try {

            await this.saveNewToken(user, "")
            
        } catch (error) {
            logger.error(new Error('METHOD: Logout'))
        }
    }
}

var userService = new UserService('User', UserSchema)
module.exports = userService