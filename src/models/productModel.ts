import { Schema, model, Types } from 'mongoose';
import mongoose from 'mongoose';

export interface IProduct {
    _id: Types.ObjectId;
    title: string;
    slug: string;
    description: string;
    price: number;
    category: Types.ObjectId;
    quantity: number;
    brand: string;
    sold: number;
    images: string[];
    color: string;
    rating: {
        star: number;
        postedBy: Types.ObjectId;
    }[];
}

const productSchema = new Schema<IProduct>({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true},
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    quantity: { type: Number, default: 0 },
    brand: {
        type: String,
        enum: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS']
    },
    sold: { type: Number, default: 0 },
    images: [{ type: String, required: true }],
    color: { type: String, enum:['Black','Brown','Red'] },
    rating:[
    {
        star: { type: Number, default: 0 },
        postedBy: { type: Types.ObjectId, ref: 'User' },
    }
    ]
}, { timestamps: true });

export default model<IProduct>('Product', productSchema);
