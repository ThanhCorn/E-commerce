import { Request, Response, NextFunction } from 'express';
import 'dotenv/config';

export const notFound = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    status:'fail',
    message: err?.message,
    stack: err?.stack,
  });
};
