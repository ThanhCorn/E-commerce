import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/user.Model';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      user: any; // Adjust the type according to your user model
    }
  }
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: "You don't have permission" });
    }

    const decoded = (await jwt.verify(
      token,
      process.env.JWT_SECRET || 'somethingsecret',
    )) as JwtPayload;

    const user = await UserModel.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "You don't have permission" });
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log(req.user);
    const { email } = req.user;
    const adminUser = await UserModel.findOne({ email });
    if (adminUser?.role === 'admin') {
      next();
    } else {
      res.status(401).json({ message: 'You need to be an admin' });
    }
  } catch (error) {
    throw new Error('Not implemented');
  }
};
