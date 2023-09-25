const {StatusCodes} = require('http-status-codes');
const CustomApiError = require('./customerror');

class UnauthenticatedError extends CustomApiError{
    constructor(message, res){
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED;
        res.send(message)
    }
}
module.exports = UnauthenticatedError