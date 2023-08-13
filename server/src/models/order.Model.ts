import { Schema, Document, Model, model, Types } from "mongoose";

// Interface for the order document
interface OrderDoc extends Document {
  userId: Schema.Types.ObjectId;
  shippingInfo: {
    address: object;
  };
  paymentIntentId: string;
  orderItems: [
    {
      productId: Schema.Types.ObjectId;
      color: Schema.Types.ObjectId;
      quantity: number;
      price: number;
    }
  ];
  paidAt?: Date;
  totalPrice: number;
  totalAfterDiscount?: number;
  orderStatus?: string;
  paymentStatus: string;
}

// Interface for the order model
export interface OrderModel extends Model<OrderDoc> {}

// Declare the Schema of the Mongo model
const orderSchema = new Schema<OrderDoc, OrderModel>(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    shippingInfo: {
      address: {
        type: Object,
        required: true,
      },
    },
    paymentIntentId: {
      type: String,
      required: true,
    },
    orderItems: [
      {
        productId: {
          type: Types.ObjectId,
          required: true,
          ref: "Product",
        },
        color: {
          type: Types.ObjectId,
          required: true,
          ref: "Color",
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    paidAt: {
      type: Date,
      default: Date.now(),
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    totalAfterDiscount: {
      type: Number,
    },
    orderStatus: {
      type: String,
      default: "Ordered",
    },
    paymentStatus: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Export the model
const OrderModel = model<OrderDoc, OrderModel>("Order", orderSchema);
export default OrderModel;
