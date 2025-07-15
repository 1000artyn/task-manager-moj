const express = require('express');
const {
  createTask,
  getTasks,
  getTaskById,
  updateStatus,
  deleteTask,
} = require('../controllers/taskController');

const router = express.Router();

router.post('/', createTask);
router.get('/', getTasks);
router.get('/:id', getTaskById);
router.patch('/:id/status', updateStatus);
router.delete('/:id', deleteTask);

module.exports = router;