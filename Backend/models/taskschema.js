const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Task title is required']
    },
    description: {
        type: String,
        required: false
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending'
    },
    dueDate: {
        type: Date,
        required: [true, 'Due date is required']
    }
}, { timestamps: true });
module.exports = mongoose.model('Task', taskSchema);