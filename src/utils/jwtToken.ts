import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import 'dotenv/config';

export const generateToken = (id: mongoose.Types.ObjectId) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'somethingsecret', {
    expiresIn: '1d',
  });
};
