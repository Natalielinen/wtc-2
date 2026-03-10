import { z } from "zod";

export const profileFormSchema = z.object({
    userName: z.string().min(2, "Минимальная длина имени 2 символа"),
    userEmail: z.string().email(),
    userPassword: z.string().min(8, "Минимальная длина пароля 4 символа"),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;