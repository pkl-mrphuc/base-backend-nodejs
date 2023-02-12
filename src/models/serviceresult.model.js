class ServiceResult {
    _success
    _errorCode
    _message
    _data

    constructor() {
        this._success = true
        this._errorCode = null
        this._message = null
        this._data = null
    }

    setError(errorCode) {
        this._success = false
        this._errorCode = errorCode
    }

    setData(data) {
        this._data = data
    }

    setMessage(message) {
        this._message = message
    }
    
}

module.exports = ServiceResult