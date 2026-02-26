import { Lang, translation } from "@/translation/translation";
import { z } from "zod";

const lang = localStorage.getItem("lang");

export const loginFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(4, translation[lang as Lang].minPasswordLength),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;