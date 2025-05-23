import { Category, Genre } from "@/app/types";
import { z } from "zod";

export const addItemSchema = z.object({
    category: z.string(),
    genre: z.string(),
    sourceLink: z.string().min(2, "Минимальная длина названия рецепта 2 символа"),
    name: z.string().min(2, "Минимальная длина названия рецепта 2 символа"),
    imageUrl: z.string().optional(),
});

export type AddItemFormValues = {
    category: Category;
    genre: Genre;
    sourceLink: string;
    name: string;
    imageUrl?: string;
}

