import mongoose, { Schema } from "mongoose";
import {  ICategory } from "./Categoty";
import { IGenre } from "./Genre";

export interface IItem extends mongoose.Document {
    id: number;
    category: ICategory;
    genre: IGenre[];
    sourceLink: string;
    name: string;
    imageUrl?: string;
    lastVisited?: Date;
    userId: mongoose.Types.ObjectId;
}


// Схема Item
export const itemSchema: Schema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    genreIds: { type: [mongoose.Schema.Types.ObjectId], ref: "Genre", required: true },
    sourceLink: { type: String, required: true },
    name: { type: String, required: true },
    imageUrl: { type: String },
    lastVisited: { type: Date },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Item = mongoose.models?.Item || mongoose.model<IItem>("Item", itemSchema);

export default Item;
