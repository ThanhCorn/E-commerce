import { Schema, model } from 'mongoose';

export interface ICoupon {
  name: string;
  expiry: Date;
  discount: number;
}

const couponSchema = new Schema<ICoupon>(
  {
    name: { type: String, required: true, unique: true, uppercase: true },
    expiry: { type: Date, required: true },
    discount: { type: Number, required: true },
  },
  { timestamps: true },
);

export default model<ICoupon>('Coupon', couponSchema);
