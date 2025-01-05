import { z } from "zod";

export const registerFormSchema = z.object({
    userName: z.string().min(2, "Минимальная длина имени 2 символа"),
    userEmail: z.string().email(),
    userPassword: z.string().min(4, "Минимальная длина пароля 4 символа"),
    retypePassword: z.string().min(4, "Минимальная длина пароля 4 символа"),
})
.refine((data) => data.userPassword === data.retypePassword, {
    message: 'Пароли не совпадают',
    path: ['retypePassword'],
  });
;

export type RegisterFormValues = z.infer<typeof registerFormSchema>;