const express = require('express')
const router = require('./routes')
const Constanst = require('./models/const.model')
const app = express() 

require('dotenv').config()

app.use(express.json())

if(process.env.USING_DB_TYPE.includes(Constanst.DBType.MONGO)) {
    const mongo = require('./models/db/mongo.db')
    mongo.connect()
}

router(app)

app.listen(1011)