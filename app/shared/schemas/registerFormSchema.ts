import { Lang, translation } from "@/translation/translation";
import { z } from "zod";

const lang = localStorage.getItem("lang");

export const registerFormSchema = z.object({
    userName: z.string().min(2, translation[lang as Lang].minUsernameLength),
    userEmail: z.string().email(),
    userPassword: z.string().min(4, translation[lang as Lang].minPasswordLength),
    retypePassword: z.string().min(4, translation[lang as Lang].minPasswordLength),
})
.refine((data) => data.userPassword === data.retypePassword, {
    message: translation[lang as Lang].passwordsNotMatch,
    path: ['retypePassword'],
  });
;

export type RegisterFormValues = z.infer<typeof registerFormSchema>;