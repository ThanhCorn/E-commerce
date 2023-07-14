import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import UserModel, { IUser } from '../models/user.model';

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: 'You need to be logged in to visit this route' });
    }
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'somethingsecret',
    ) as JwtPayload;
    console.log(decoded);
    const user = await UserModel.findById(decoded.id);
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    (req as RequestWithUser).user = user;
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
    const user = (req as RequestWithUser).user;
    if (!user) {
      return res
        .status(401)
        .json({ message: 'You need to be logged in to visit this route' });
    }
    if (user.role === 'admin') {
      next();
    } else {
      return res
        .status(401)
        .json({ message: 'You need to be an Admin to access in this role' });
    }
    if (user._id.toString() === req.params.id) {
      return next();
    }
    return res.status(401).json({ message: 'Not authorized' });
  } catch (error) {
    throw new Error('Not implemented');
  }
};

interface RequestWithUser extends Request {
  user?: IUser;
}
