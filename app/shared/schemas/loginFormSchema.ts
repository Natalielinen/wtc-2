
import { Lang, translation } from "@/translation/translation";
import { z } from "zod";

export const createLoginFormSchema = (lang: Lang) =>
  z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(4, translation[lang].minPasswordLength),
  });

export type LoginFormValues = z.infer<
  ReturnType<typeof createLoginFormSchema>
>;