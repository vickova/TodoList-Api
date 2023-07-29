const {StatusCodes} = require('http-status-codes');

const NotFound = (req, res, next)=>{
    console.log('Page not found');
    res.status(StatusCodes.NOT_FOUND).send('Page not found')
    next()
}
module.exports = NotFound