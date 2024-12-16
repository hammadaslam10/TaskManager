const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Task = require("../models/taskschema")
exports.GetSingleTask = catchAsyncErrors(async (req, res, next) => {
    const data = await Task.findById(req.params.id)
    if (!data) {
        return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({
        success: true,
        data
    })
})
exports.GetTask = catchAsyncErrors(async (req, res, next) => {
    const tasks = await Task.find();
    res.status(200).json({
        success: true,
        data: tasks,
        message: "Task Retrieve SuccessFully"
    });
})
exports.CreateTask = catchAsyncErrors(async (req, res, next) => {
    const { title, description, status, dueDate } = req.body;
    const newTask = new Task({ title, description, status, dueDate });
    await newTask.save();
    res.status(200).json({
        success: true,
        data: newTask,
        message: "Task Created SuccessFully"
    });
})
exports.UpdateTask = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const { title, description, status, dueDate } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(id, { title, description, status, dueDate }, { new: true, runValidators: true });
    if (!updatedTask) {
        return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({
        success: true,
        data: updatedTask,
        message: "Task Updated SuccessFully"
    });
})
exports.DeleteTask = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
        return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({
        success: true,
        data: deletedTask,
        message: "Task Deleted SuccessFully"
    });
})