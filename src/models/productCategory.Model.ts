import { Schema, model } from 'mongoose';

export interface ICategory {
  title: string;
}

const productCategorySchema = new Schema<ICategory>(
  {
    title: { type: String, required: true, unique: true, index: true },
  },
  { timestamps: true },
);

export default model<ICategory>('PCategory', productCategorySchema);
