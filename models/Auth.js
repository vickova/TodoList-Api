const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv')
const bcrypt = require('bcryptjs');

const AuthSchema =new mongoose.Schema({
    name:{
        type:String,
        nested: {
            firstName: { type: String },
            lastName: { type: String }
          },
        required:[true, 'Please Provide a name'],
        minLength:3,
        maxLength:50
    },
    email:{
        type:String,
        required:[true, 'Please Provide your email address'],
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide valid email'
        ],
        unique:true
    },
    password:{
        type:String,
        required:[true, 'Password is required'],
        minLength:6,
        maxLength: 12
    }
})

AuthSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next()
})        


AuthSchema.methods.createJWT = function(){
    return jwt.sign({userId:this._id, name: this.name}, process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME})
}


AuthSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch
}

module.exports = mongoose.model('User', AuthSchema)