const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['todo', 'in-progress', 'completed'], default: 'todo' },
    dueDate: { type: Date },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }, // Reference to the Category model
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the User model

  });

module.exports = mongoose.model('Task', taskSchema);