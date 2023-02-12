const mongoose = require("mongoose")
const ServiceResult = require("../../models/serviceresult.model")
const Enum = require('../../models/enum.model')

class BaseMongoService {

    _model = null

    constructor(nameModel, schemaModel) {
        this._model = mongoose.model(nameModel, schemaModel)
    }

    async getAll() {
        let res = new ServiceResult()

        try {

            res.setData(await this._model.find())

        } catch (error) {
            res.setError(error)
        }

        return res
    }

    async getById(id) {
        let res = new ServiceResult()

        try {

            res.setData(await this._model.find({ _id: id }))

        } catch (error) {
            res.setError(error)
        }

        return res

    }

    async insert(data) {
        let res = new ServiceResult()

        try {

            await this._model.collection.insertOne(data)

        } catch (error) {
            res.setError(error)
        }

        return res


    }

    async update(id, data) {
        let res = new ServiceResult()

        try {

            await this._model.updateOne({ _id: id }, data)

        } catch (error) {
            res.setError(error)
        }

        return res
    }

    async delete(ids) {
        let res = new ServiceResult()

        try {

            let lstId = ids.split(',')
            if (lstId && lstId.length > 0) {

                await this._model.deleteMany({
                    _id: {
                        $in: lstId
                    }
                })

            }
            else {
                res.setError(Enum.ErrorCode.EmptyInput)
            }

        } catch (error) {
            res.setError(error)
        }

        return res
    }

}

module.exports = BaseMongoService