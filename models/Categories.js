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
    normalizedTitle:{
        type:String,
        unique:[true, 'This category already exist'],
        index:true
    }
}, {timestamps: true})


CategoriesSchema.pre('save', function (next) {
    if (this.isModified('name')) {
      this.normalizedTitle = this.name.toLowerCase(); // Convert the title to lowercase and store in normalizedTitle
    }
    next();
  });
module.exports = mongoose.model('Categories',CategoriesSchema);