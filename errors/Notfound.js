const {StatusCodes} = require('http-status-codes');
const CustomApIError = require('./customerror');

class NotFoundError extends CustomApIError{
    constructor(message){
        super(message);
        this.statusCode = StatusCodes.NO_CONTENT;
    }
}
module.exports = NotFoundError