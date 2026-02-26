import { Lang, translation } from "@/translation/translation";
import { z } from "zod";

const lang = localStorage.getItem("lang");

export const profileFormSchema = z.object({
    userName: z.string().min(2, translation[lang as Lang].minUsernameLength),
    userEmail: z.string().email(),
    userPassword: z.string().min(4, translation[lang as Lang].minPasswordLength),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;