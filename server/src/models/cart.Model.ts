import { Schema, model } from 'mongoose';

export interface ICartProduct {
  product?: Schema.Types.ObjectId;
  count?: number;
  color?: string;
  price?: number;
}

export interface ICart {
  products?: ICartProduct[];
  cartTotal?: number;
  totalAfterDiscount?: number;
  orderedBy?: Schema.Types.ObjectId;
}

const cartSchema = new Schema<ICart>(
  {
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
        },
        count: Number,
        color: String,
        price: Number,
      },
    ],
    cartTotal: Number,
    totalAfterDiscount: Number,
    orderedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

export default model<ICart>('Cart', cartSchema);
