/**
 * BaseClass QueryMySQL => Build query string using mysql
 * created by lkphuc 12.02.2023
 */
class QueryMySQL {

    _tableName = null

    constructor(tableName) {
        this._tableName = tableName
    }

    /**
     * build query to getall records in a table
     * @param {String} colums  
     * @returns string select all
     * created by lkphuc 12.02.2023
     */
    buildSelectAllQuery(colums) {
        if(!colums) {
            return `select * from ${this._tableName}`
        }
        return `select ${colums} from ${this._tableName}`
    }

    /**
     * build query to getbywhere record in a table
     * @param {String} colums 
     * @param {Array} where item in where => { FieldName: String, Operator: String, FieldValue: String } 
     * @param {Integer} start 
     * @param {Integer} limit 
     * @returns string select 
     * created by lkphuc 12.02.2023
     */
    buildSelectPagingQuery(colums, where, start, limit) {
        if(!colums) {
            colums = `*`
        }

        if(where && Array.isArray(where)) {
            let whereQ = ``;
            for(let i = 0; i < where.length; i ++) {
                
            }
            
            return `select ${colums} from ${this._tableName} where ${whereQ}`    
        }

        return null;
    }

    buildInsertQuery() {

    }

    buildUpdateQuery() {

    }

    buildDeleteQuery(whereCondition) {
        let whereQ = '';
        for(let i = 0; i < whereCondition.length; i++) {
            let colName = whereCondition[i].ColName
            let operator = whereCondition[i].Operator
            let value = whereCondition[i].Value
            whereQ +=  `${colName} ${operator} ${value}`
            whereQ += ' and ';
        }
        let q = `delete from ${this._tableName} where ${whereQ}`
        return q
    }

}

module.exports = QueryMySQL