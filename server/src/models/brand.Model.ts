import { Schema, model } from "mongoose";

export interface IBrand {
  title: string;
}

const brandSchema = new Schema<IBrand>(
  {
    title: { type: String, required: true, unique: true, index: true },
  },
  { timestamps: true }
);

export default model<IBrand>("Brand", brandSchema);
