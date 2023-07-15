import { Schema, model, Types } from 'mongoose';

export interface IUser {
  _id: Types.ObjectId;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  password: string;
  role: string;
  isBlocked: boolean;
  cart: Types.ObjectId[];
  address: string;
  wishlist: Types.ObjectId[];
  refreshToken: string;
}

const userSchema = new Schema<IUser>({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  isBlocked: { type: Boolean, default: false },
  cart: { type: [{ type: Types.ObjectId, ref: 'Product' }], default: [] },
  address: { type: String, default: '' },
  wishlist: [{ type: Types.ObjectId, ref: 'Product' }],
  refreshToken: { type: String },
});

export default model<IUser>('User', userSchema);
