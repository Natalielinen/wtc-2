import { CategoriesEnum, GenreEnum } from "@/server/schema";
import { z } from "zod";

export const addItemSchema = z.object({
  category: z.enum([...(CategoriesEnum.enumValues as [string, ...string[]])]),
  genre: z.enum([...(GenreEnum.enumValues as [string, ...string[]])]),
  sourceLink: z.string().min(2, "Минимальная длина ссылки 2 символа"),
  name: z.string().min(2, "Минимальная длина названия рецепта 2 символа"),
  imageUrl: z.string().optional(),
});

export type AddItemFormValues = z.infer<typeof addItemSchema>;