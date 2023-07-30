const Task = require('../models/Tasks');
const {StatusCodes} = require('http-status-codes');
const {NotFound} = require('../errors')


exports.getAllTasks =async (req, res)=>{
        const tasks = await Task.find({createdBy:req.user.userId}).sort('createdAt');
        if(!tasks){
            throw new NotFound('No tasks yet')
        }
        console.log(tasks)
        res.status(StatusCodes.OK).send({...tasks})
}

exports.CreateTask =async (req,res)=>{
    req.body.category = req.params.id;
    req.body.createdBy = req.user.userId;
    const createdTask = await Task.create({...req.body});
    res.status(StatusCodes.CREATED).json({createdTask})
}

exports.deleteTask =async (req, res)=>{
    const tasks = await Task.findByIdAndDelete({
        _id:req.params.id,createdBy:req.user.userId}
    )  
    if(!tasks){
        throw new NotFound(`task not found`)
    }
    res.send('Category deleted')
}
exports.updateTask =async (req, res)=>{d;
    const tasks = await Task.findByIdAndUpdate({
        _id:req.params.id,createdBy:req.user.userId},req.body,{new:true, runValidators:true}
    )    
    if(!tasks){
        throw new NotFound(`task not found`)
    }
    res.status(StatusCodes.OK).json(tasks)
}

