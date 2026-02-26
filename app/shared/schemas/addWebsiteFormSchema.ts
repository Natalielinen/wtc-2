import { Lang, translation } from "@/translation/translation";
import { z } from "zod";

const lang = localStorage.getItem("lang");

export const addWebsiteSchema = z.object({
  name: z.string().min(2, translation[lang as Lang].minNameLength),
  url: z.string().min(2, translation[lang as Lang].minLinkLength).url(translation[lang as Lang].incorrectLink),
});

export type AddWebsiteFormValues = z.infer<typeof addWebsiteSchema>;