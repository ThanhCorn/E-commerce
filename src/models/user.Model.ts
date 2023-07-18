import { Schema, model, Types } from 'mongoose';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

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
  passwordResetToken: string | undefined;
  passwordResetExpires: Date | undefined;
  passwordChangedAt: Date;
  isPasswordMatch: (password: string) => Promise<boolean>;
  createPasswordResetToken: () => Promise<string>;
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
  passwordResetToken: { type: String },
  passwordResetExpires: { type: Date },
  passwordChangedAt: { type: Date },
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
  next();
});

userSchema.methods.isPasswordMatch = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.createPasswordResetToken = async function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = Date.now() + 30 * 60 * 1000; // 10 minutes
  return resetToken;
};

export default model<IUser>('User', userSchema);
