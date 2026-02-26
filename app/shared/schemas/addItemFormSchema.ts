import { CategoriesEnum, GenreEnum } from "@/server/schema";
import { Lang, translation } from "@/translation/translation";
import { z } from "zod";

const lang = localStorage.getItem("lang");

export const addItemSchema = z.object({
  category: z.enum([...(CategoriesEnum.enumValues as [string, ...string[]])]),
  genre: z.enum([...(GenreEnum.enumValues as [string, ...string[]])]),
  sourceLink: z.string().min(2, translation[lang as Lang].minLinkLength),
  name: z.string().min(2, translation[lang as Lang].minNameLength),
  imageUrl: z.string().optional(),
});

export type AddItemFormValues = z.infer<typeof addItemSchema>;


