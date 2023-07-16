import { Schema, model, Types } from 'mongoose';

export interface IProduct {
  _id: Types.ObjectId;
  title: string;
  slug: string;
  description: string;
  price: number;
  category?: string;
  quantity: number;
  brand?: string;
  sold: number;
  images?: Array<{
    public_id: string;
    url: string;
  }>;
  color?: string[];
  tag?: string;
  rating?: Array<{
    star: number;
    postedBy: Types.ObjectId;
    comment?: string;
  }>;
}

const productSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
      type: String,
      require: true,
    },
    quantity: { type: Number, required: true },
    brand: {
      type: String,
      require: true,
    },
    sold: { type: Number, default: 0 },
    tag: String,
    images: [
      {
        public_id: String,
        url: String,
      },
    ],
    color: [],
    rating: [
      {
        star: { type: Number, default: 0 },
        postedBy: { type: Types.ObjectId, ref: 'User' },
        comment: String,
      },
    ],
  },
  { timestamps: true },
);

export default model<IProduct>('Product', productSchema);
