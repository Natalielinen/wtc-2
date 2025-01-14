import mongoose, { Schema } from "mongoose";

export interface IGenre extends mongoose.Document {
    id: number;
    value: string;
    label: string;
}

export const genreSchema: Schema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  value: { type: String, required: true },
  label: { type: String, required: true },
});

const Genre = mongoose.models?.Genre || mongoose.model<IGenre>("Genre", genreSchema);

export default Genre;
