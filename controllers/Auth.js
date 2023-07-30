const User = require('../models/Auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {StatusCodes} = require('http-status-codes');
const {BadRequest, Unauthenticated} = require('../errors')

exports.RegisterUser =async (req,res)=>{
    // const salt =await bcrypt.genSalt(10);
    // const hashedpassword =await bcrypt.hash(password, salt);
    // console.log(hashedpassword)
    const user = await User.create({...req.body})
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({
        name: user.name,
        email: user.email
    });
}
exports.LoginUser =async (req, res)=>{
    const {name, email, password} = req.body;
    if(!email || !password){
        throw new Unauthenticated('Please provide email and password');
    }
    const user = await User.findOne({email:email});
    if(!user){
        throw new BadRequest('Invalid User');
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect){
        throw new Unauthenticated('Password Incorrect')
    }
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({user:{name:name, email:email},token: token})
}
