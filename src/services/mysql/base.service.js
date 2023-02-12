const QueryMySQL = require("../../models/db/query.db")
const ServiceResult = require("../../models/serviceresult.model")
const Connection = require("../../models/db/mysql.db")

class BaseMYSQLService {

    _query;

    constructor(tableName) {
        this._query = new QueryMySQL(tableName)
    }

    handleResult(results) {}

    async getAll() {
        let res = new ServiceResult()

        try {

            Connection.connect()
            Connection.query(this._query.buildSelectAllQuery(), (error, results, fields) => {
                if (error) {
                    res.setError(error)
                }
                this.handleResult(results)
            })
            Connection.end()

        } catch (error) {
            res.setError(error)
        }

        return res
    }

    async getById(id) {
        let res = new ServiceResult()

        try {

            Connection.connect()
            Connection.query(this._query.buildSelectPagingQuery('*', [{}], 0, 1), (error, results, fields) => {
                if (error) {
                    res.setError(error)
                }
                this.handleResult(results)
            })
            Connection.end()

        } catch (error) {
            res.setError(error)
        }

        return res

    }

    async insert(data) {
        let res = new ServiceResult()

        try {

        } catch (error) {
            res.setError(error)
        }

        return res


    }

    async update(id, data) {
        let res = new ServiceResult()

        try {


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