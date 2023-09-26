const {StatusCodes} = require('http-status-codes');
const CustomApIError = require('./customerror');

class UnauthenticatedError extends CustomApIError{
    constructor(message, res){
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}
module.exports = UnauthenticatedError