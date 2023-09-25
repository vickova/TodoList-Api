const {StatusCodes} = require('http-status-codes');
const CustomApiError = require('./customerror');

class BadRequestError extends CustomApiError{
    constructor(message, res){
        super(message);
        this.statusCode = StatusCodes.BAD_REQUEST;
        res.send(message)
    }
}
module.exports = BadRequestError