const express = require('express');
const {getAllCategories, getCategory, deleteCategory, updateCategory, CreateCategory} = require('../controllers/Categories')
const {CreateTask} = require('../controllers/Tasks')

const router = express.Router();

router.route('/').get(getAllCategories).post(CreateCategory)
router.route('/:id').get(getCategory).delete(deleteCategory).patch(updateCategory).post(CreateTask)

module.exports = router;