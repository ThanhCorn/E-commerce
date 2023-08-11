import { Schema, model } from "mongoose";

export interface ICart {
  userId?: Schema.Types.ObjectId;
  productId?: Schema.Types.ObjectId[];
  quantity?: number;
  color?: Schema.Types.ObjectId[];
  price: number;
}

const cartSchema = new Schema<ICart>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    productId: { type: Schema.Types.ObjectId, ref: "Product" },
    quantity: { type: Number, required: true },
    color: { type: Schema.Types.ObjectId, ref: "Color" },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

export default model<ICart>("Cart", cartSchema);
