const express = require('express');
const {getAllTasks, deleteTask, updateTask} = require('../controllers/Tasks')

const router = express.Router();

router.route('/').get(getAllTasks)
router.route('/:id').delete(deleteTask).patch(updateTask)

module.exports = router;