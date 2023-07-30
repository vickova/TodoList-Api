const { StatusCodes } = require('http-status-codes');
const CategoriesSchema = require('../models/Categories');
const {NotFound, BadRequest} = require('../errors');
const Tasks = require('../models/Tasks');

exports.getAllCategories =async (req, res)=>{
    try {
        const categories = await CategoriesSchema.find({createdBy:req.user.userId}).sort('createdAt');
    res.status(StatusCodes.OK).send({...categories})
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).send('User already exist')
    }
}

exports.CreateCategory =async (req,res)=>{
    req.body.createdBy = req.user.userId;
    const createdCategories = await CategoriesSchema.create(req.body);
    res.status(StatusCodes.CREATED).json({createdCategories})
}

exports.getCategory =async (req, res)=>{
    const searchquery =  req.user.name;
    const category = await CategoriesSchema.findOne({_id:req.params.id, createdBy:req.user.userId});
    const tasks = await Tasks.find({category:req.params.id, createdBy:req.user.userId})
    if(!category || !tasks){
        throw new NotFound(`Category ${req.user.name} does not exist`)
    }
    // console.log(category)
    res.status(StatusCodes.OK).send({tasks})
}

exports.deleteCategory =async (req, res)=>{
    const {user, params} = req
    const category = await CategoriesSchema.findByIdAndRemove({_id:params.id, createdBy:user.userId});
    if(!category){
        throw new BadRequest(`No category wit id ${req.params.id}`)
    }
    res.status(StatusCodes.OK).send('deleted')
}
exports.updateCategory =async (req, res)=>{
    const {name, description} = req.body
    // console.log(req.body)
    if(name === '' || description ===''){
        throw new BadRequest('Please fill in the name and description fields');
    }
    // Model.findByIdAndUpdate(id, update, options, callback);
    const category = await CategoriesSchema.findByIdAndUpdate({
        _id:req.params.id, createdBy:req.user.userId}, req.body, {new:true, runValidators:true
        });
    if(!category){
        throw new NotFound(`No category wit id ${req.params.id}`)
    }
    res.send('Category updated')
}