import { Schema, model, Types } from 'mongoose';

export interface IProduct {
  title: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  quantity: number;
  brand: string;
  sold?: number;
  images?: {
    public_id: string;
    url: string;
  };
  color?: string[];
  tags?: string[];
  ratings?: Array<{
    star: number;
    postedBy: Types.ObjectId;
    comment?: string;
  }>;
  totalRating?: string;
}

const productSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, require: true },
    quantity: { type: Number, required: true },
    brand: { type: String, require: true },
    sold: { type: Number, default: 0 },
    tags: [],
    images: [{ public_id: String, url: String }],
    color: [],
    ratings: [
      {
        star: { type: Number, default: 0 },
        postedBy: { type: Types.ObjectId, ref: 'User' },
        comment: String,
      },
    ],
    totalRating: { type: String, default: 0 },
  },
  { timestamps: true },
);

export default model('Product', productSchema);
