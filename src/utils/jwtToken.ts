import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

export const generateToken = (id: mongoose.Types.ObjectId) => {
   return jwt.sign({ id }, process.env.JWT_SECRET || 'somethingsecret', {expiresIn: '30d'})
}