import { z } from "zod";

export const loginFormSchema = z.object({
    userEmail: z.string().email(),
    userPassword: z.string().min(4, "Минимальная длина пароля 4 символа"),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;