import { Request, Response } from 'express';
import User from '../models/user-model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import { IUser } from '../types';

const generateToken = (_id: string | Types.ObjectId) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET!, {
    expiresIn: '7d',
  });
};

const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password }: IUser = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: 'Please fill all fields', success: false });
    }

    // check for existing user
    const isUserExisting = await User.findOne({ email });

    if (isUserExisting) {
      return res.status(400).json({
        message: 'User already exists',
        success: false,
      });
    }

    // hash for password
    const hashedPassword = await bcrypt.hash(password, 12);

    // create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(200).json({
      message: 'User created successfully',
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password }: IUser = req.body;

    // check if user exists
    const isUserExisting = await User.findOne({ email });

    // response for if user doesn't exist
    if (!isUserExisting) {
      return res.status(400).json({
        message: 'User with email does not exist',
        success: false,
      });
    }

    //compare password
    const comparePassword = await bcrypt.compare(
      password,
      isUserExisting.password
    );

    if (comparePassword) {
      const token = generateToken(isUserExisting._id);

      return res.status(200).json({
        token,
        user: {
          email: isUserExisting.email,
          name: isUserExisting.name,
        },
        success: true,
      });
    } else {
      return res.status(400).json({
        message: 'Incorrect password',
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export { createUser, loginUser };
