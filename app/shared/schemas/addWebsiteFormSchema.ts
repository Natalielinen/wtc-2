import { z } from "zod";

export const addWebsiteSchema = z.object({
  name: z.string().min(2, "Минимальная длина 2 символа"),
  url: z.string().min(2, "Минимальная длина 2 символа").url("Неверная ссылка"),
});

export type AddWebsiteFormValues = z.infer<typeof addWebsiteSchema>;