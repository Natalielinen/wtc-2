import mongoose, { Schema } from "mongoose";

interface IOption {
    value: string;
    label: string;
}

export interface IItem extends mongoose.Document {
    id: number;
    category: IOption;
    genre: IOption[];
    sourceLink: string;
    name: string;
    imageUrl?: string;
    lastVisited?: Date;
}

// Определяем схему Option
const OptionSchema = new mongoose.Schema({
  value: { type: String, required: true },
  label: { type: String, required: true },
});

// Схема Item
export const itemSchema: Schema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    category: { type: OptionSchema, required: true },
    genre: { type: [OptionSchema], required: true },
    sourceLink: { type: String, required: true },
    name: { type: String, required: true },
    imageUrl: { type: String },
    lastVisited: { type: Date },
  },
  { timestamps: true }
);

const Item = mongoose.models.Item || mongoose.model<IItem>("Item", itemSchema);

export default Item;
