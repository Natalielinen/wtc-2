import mongoose, { Schema } from "mongoose";
import { IItem, itemSchema } from "./Item"; // Импорт схемы Item, если она в отдельном файле


export interface IUser extends mongoose.Document {
    id: number;
    userName: string;
    userEmail: string;
    userPassword: string;
    uerItems: IItem[];
}
// Основная схема User
const userSchema: Schema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true, unique: true }, // Email должен быть уникальным
    userPassword: { type: String, required: true },
    uerItems: { type: [itemSchema], default: [] }, // Массив объектов Item
  },
  { timestamps: true } // Добавляет createdAt и updatedAt
);

const User = mongoose.models?.User || mongoose.model<IUser>("User", userSchema);

export default User;

