import { Schema, model, Document } from 'mongoose';
import { IProduct } from './cart.Model';

interface IOrder extends Document {
  products: IProduct[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  paymentIntent: any; // Replace 'any' with the appropriate type for paymentIntent
  orderStatus:
    | 'Not Processed'
    | 'Cash On Delivery'
    | 'Processing'
    | 'Dispatched'
    | 'Cancelled'
    | 'Completed';
  orderedBy: Schema.Types.ObjectId;
}

const orderSchema = new Schema<IOrder>(
  {
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
        },
        count: Number,
        color: String,
      },
    ],
    paymentIntent: {}, // Replace '{}' with the appropriate type for paymentIntent
    orderStatus: {
      type: String,
      default: 'Not Processed',
      enum: [
        'Not Processed',
        'Cash On Delivery',
        'Processing',
        'Dispatched',
        'Cancelled',
        'Completed',
      ],
    },
    orderedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

export default model<IOrder>('Order', orderSchema);
