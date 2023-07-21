import { Schema, model } from 'mongoose';

export interface IColor {
  title: string;
}

const colorSchema = new Schema<IColor>(
  {
    title: { type: String, required: true, unique: true, index: true },
  },
  { timestamps: true },
);

export default model<IColor>('Color', colorSchema);
