import { Schema, model } from "mongoose";

export interface IBlogCategory {
  title: string;
}

const blogCategorySchema = new Schema<IBlogCategory>(
  {
    title: { type: String, required: true, unique: true, index: true },
  },
  { timestamps: true }
);

export default model<IBlogCategory>("BCategory", blogCategorySchema);
