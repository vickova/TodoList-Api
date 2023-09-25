const {StatusCodes} = require('http-status-codes');
const CustomApiError = require('./customerror');

class BadRequestError extends CustomApiError{
    constructor(message, res){
        super(message);
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}
module.exports = BadRequestError