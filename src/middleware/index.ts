import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export interface AuthRequest extends Request {
  userId: string | JwtPayload;
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res
        .status(401)
        .json({ message: 'Please login to continue', success: false });
    }

    const token = authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
    req.userId = decodedToken;
    next();
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
