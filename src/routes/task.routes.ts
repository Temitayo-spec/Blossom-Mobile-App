import express from 'express';
import { authMiddleware } from '../middleware';
import {
  createTask,
  getAllTaskByCategory,
  getAllTasks,
  toggleTaskStatus,
  deleteTask,
  getAllCompletedTasks,
  getTodayTasks,
  editTask,
} from '../controllers/task.controller';

const taskRoutes = express.Router();

taskRoutes.use(authMiddleware);

taskRoutes.route('/').get(getAllTasks);
taskRoutes.route('/tasks-by-categories/:categoryId').get(getAllTaskByCategory);
taskRoutes.route('/completed').get(getAllCompletedTasks);
taskRoutes.route('/today').get(getTodayTasks);
taskRoutes.route('/create').post(createTask);
taskRoutes.route('/update/:id').put(toggleTaskStatus);
taskRoutes.route('/edit/:id').put(editTask);
taskRoutes.route('/delete/:id').delete(deleteTask);

export default taskRoutes;
