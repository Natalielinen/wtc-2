import mongoose, { Schema } from "mongoose";

export interface ICategory extends mongoose.Document {
    id: number;
    value: string;
    label: string;
}

export const categorySchema: Schema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  value: { type: String, required: true },
  label: { type: String, required: true },
});

const Category = mongoose.models?.Category || mongoose.model<ICategory>("Category", categorySchema);

export default Category;
