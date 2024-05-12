import express from 'express';
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from '../controllers/category.controller';
import { authMiddleware } from '../middleware';

const categoryRoutes = express.Router();

categoryRoutes.use(authMiddleware);

categoryRoutes.route('/').get(getAllCategories);
categoryRoutes.route('/:id').get(getCategoryById);
categoryRoutes.route('/create').post(createCategory);
categoryRoutes.route('/delete/:id').delete(deleteCategory);
categoryRoutes.route('/update/:id').put(updateCategory);

export default categoryRoutes;
