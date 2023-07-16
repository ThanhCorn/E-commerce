import { Schema, model, Types } from 'mongoose';
import bcrypt from 'bcrypt';

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
  isPasswordMatch: (password: string) => Promise<boolean>;
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

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
  next();
})

userSchema.methods.isPasswordMatch = async function (password: string) {
  return await bcrypt.compare(password, this.password);
}

export default model<IUser>('User', userSchema);
