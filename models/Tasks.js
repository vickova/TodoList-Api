const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['todo', 'in-progress', 'completed'], default: 'todo' },
    dueDate: { type: Date },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }, // Reference to the Category model
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the User model
    normalizedTitle:{
      type:String,
      unique:true,
      index:true
    }
  });

  taskSchema.pre('save', function (next) {
    if (this.isModified('title')) {
      this.normalizedTitle = this.title.toLowerCase(); // Convert the title to lowercase and store in normalizedTitle
    }
    next();
  });
module.exports = mongoose.model('Task', taskSchema);