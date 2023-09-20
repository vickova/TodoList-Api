const {StatusCodes} = require('http-status-codes');
const CustomApiError = require('./customerror');

class NotFoundError extends CustomApiError{
    constructor(message, res){
        super(message);
        this.statusCode = StatusCodes.NO_CONTENT;
    }
}
module.exports = NotFoundError