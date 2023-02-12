const BaseMongoService = require("./mongo/base.service")
const SystemConfigSchema = require('../models/sysconfig.model')

class SystemConfigService extends BaseMongoService {

    constructor(nameModel, schemaModel) {
        super(nameModel, schemaModel)
    }

}

var sysConfigService = new SystemConfigService('SysConfig', SystemConfigSchema)
module.exports = sysConfigService