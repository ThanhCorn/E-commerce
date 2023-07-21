import { Schema, Document, Model, model, Types } from 'mongoose';

// Interface for the product item in the order
export interface OrderProduct {
  product: Types.ObjectId;
  count: number;
  color: string;
}

// Interface for the payment intent
interface PaymentIntent {
  id: string;
  method: string;
  amount: number;
  status: string;
  created: Date;
  currency: string;
}

// Interface for the order document
interface OrderDoc extends Document {
  products: OrderProduct[];
  paymentIntent: PaymentIntent;
  orderStatus: string;
  orderedBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// Interface for the order model
export interface OrderModel extends Model<OrderDoc> {}

// Declare the Schema of the Mongo model
const orderSchema = new Schema<OrderDoc, OrderModel>(
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
    paymentIntent: {},
    orderStatus: {
      type: String,
      default: 'Not Processed',
      enum: [
        'Not Processed',
        'Cash on Delivery',
        'Processing',
        'Dispatched',
        'Cancelled',
        'Delivered',
      ],
    },
    orderedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

// Export the model
const OrderModel = model<OrderDoc, OrderModel>('Order', orderSchema);
export default OrderModel;
