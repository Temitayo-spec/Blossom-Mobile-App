import { Request, Response } from 'express';
import Task from '../models/task-model';
import { AuthRequest } from '../middleware';
import { ITask } from '../types';

const getAllTasks = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const tasks = await Task.find({ userId });

    return res.status(200).json({
      tasks,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Something went wrong',
      success: false,
    });
  }
};

const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const { name, date, categoryId }: ITask = req.body;

    const task = await Task.create({
      name,
      date,
      categoryId,
      userId,
    });

    return res.status(200).json({
      message: 'Task created successfully',
      success: true,
      task,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Something went wrong',
      success: false,
    });
  }
};

const getAllTaskByCategory = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const { categoryId } = req.params;

    const task = await Task.find({
      userId: userId,
      categoryId: categoryId,
    });

    return res.status(200).json({
      task,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Something went wrong',
      success: false,
    });
  }
};

const getAllCompletedTasks = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;

    const task = await Task.find({
      userId: userId,
      isCompleted: true,
    });

    return res.status(200).json({
      task,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Something went wrong',
      success: false,
    });
  }
};

const getTodayTasks = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;

    const todaysDate = new Date();

    todaysDate.setHours(0, 0, 0, 0);

    const tasks = await Task.find({
      userId: userId,
      date: todaysDate.toISOString(),
    });

    return res.status(200).json({
      tasks,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Something went wrong',
      success: false,
    });
  }
};

const toggleTaskStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { isCompleted }: ITask = req.body;
    const { id } = req.params;

    await Task.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          isCompleted,
        },
      }
    );

    return res.status(200).json({
      message: 'Task updated successfully',
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Something went wrong',
      success: false,
    });
  }
};

const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    await Task.deleteOne({
      _id: id,
    });

    return res.status(200).json({
      message: 'Task deleted successfully',
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Something went wrong',
      success: false,
    });
  }
};

const editTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { categoryId, date, name }: ITask = req.body;

    await Task.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          name,
          categoryId,
          date,
        },
      }
    );

    return res.status(200).json({
      message: 'Task updated successfully',
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Something went wrong while updating',
      success: false,
    });
  }
};

export {
  getAllTasks,
  createTask,
  toggleTaskStatus,
  getAllTaskByCategory,
  deleteTask,
  getAllCompletedTasks,
  getTodayTasks,
  editTask,
};
