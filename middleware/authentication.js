const jwt = require('jsonwebtoken')
const {Unauthenticated, BadRequestError} = require('../errors')


const auth = async (req, res, next)=>{
    // check header
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new Unauthenticated('Authentication Invalid')
    }
    const token = authHeader.split(' ')[1]
    
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {userId: payload.userId, name: payload.name}
    } catch (error) {
        throw new Unauthenticated('Aunthentication Invalid catch')
    }
    next()
}

module.exports = auth