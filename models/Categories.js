const mongoose = require('mongoose');

const CategoriesSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please include the name of the category'],
    },
    description:{
        type:String,
        maxLength:50,
        required:[true, 'please decsribe your task']
    },
    
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, {timestamps: true})



module.exports = mongoose.model('Categories',CategoriesSchema);