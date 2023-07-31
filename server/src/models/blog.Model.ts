import { Schema, model, Types } from "mongoose";

export interface IBlog {
  title: string;
  description: string;
  category: string;
  numViews: number;
  isLiked: boolean;
  isDisliked: boolean;
  likes: Types.ObjectId[];
  dislikes: Types.ObjectId[];
  images?: Array<{
    public_id: string;
    url: string;
  }>;
  author: string;
}

const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, require: true },
    numViews: { type: Number, default: 0 },
    isLiked: { type: Boolean, default: false },
    isDisliked: { type: Boolean, default: false },
    likes: [{ type: Types.ObjectId, ref: "User" }],
    dislikes: [{ type: Types.ObjectId, ref: "User" }],
    images: [{ public_id: String, url: String }],
    author: { type: String, default: "admin" },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

export default model<IBlog>("Blog", blogSchema);
