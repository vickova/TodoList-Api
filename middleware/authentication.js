const jwt = require('jsonwebtoken')
const {Unauthenticated, BadRequestError} = require('../errors')


const auth = async (req, res, next)=>{
    // check header
    const authHeader = req.headers.authorization;
    console.log(authHeader)
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new Unauthenticated('Authentication Invalid')
    }
    const token = authHeader.split(' ')[1]
    console.log(token)
    
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {userId: payload.userId, name: payload.name}
        console.log("past the user")
    } catch (error) {
        throw new Unauthenticated('Aunthentication Invalid catch')
    }
    next()
}

module.exports = auth