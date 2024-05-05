import { Request, Response } from 'express';
import Category from '../models/category-model';
import { ICategory } from '../types';
import { AuthRequest } from '../middleware';

const getAllCategories = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req;
    const categories = await Category.find({
      userId: userId,
    });
    return res.status(200).json({
      categories,
      success: true,
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const createCategory = async (req: AuthRequest, res: Response) => {
  try {
    const { name, color, icon, isEditable }: ICategory = req.body;

    const { userId } = req;

    const category = await Category.create({
      color,
      icon,
      name,
      isEditable,
      userId,
    });

    return res.status(200).json({
      message: 'Category created successfully',
      success: true,
      category,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const deleteCategory = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    await Category.deleteMany({ _id: id });

    return res.status(200).json({
      message: 'Category deleted successfully',
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const updateCategory = async (req: AuthRequest, res: Response) => {
  try {
    const { name, color, icon, isEditable }: ICategory = req.body;
    const { id } = req.params;

    await Category.updateOne(
      { _id: id },
      {
        $set: {
          name,
          color,
          icon,
          isEditable,
        },
      }
    );

    return res.status(200).json({
      message: 'Category updated successfully',
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export { getAllCategories, createCategory, deleteCategory, updateCategory };
