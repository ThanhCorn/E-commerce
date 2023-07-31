import { Schema, model } from "mongoose";

export interface IContact {
  name: string;
  email: string;
  phone: string;
  comment: string;
  status: string;
}

const contactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    comment: { type: String, required: true },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "processing", "completed", "rejected"],
    },
  },
  { timestamps: true }
);

export default model<IContact>("Contact", contactSchema);
