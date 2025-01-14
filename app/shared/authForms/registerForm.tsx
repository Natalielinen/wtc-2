'use client';

import { FormProvider, useForm } from "react-hook-form";
import { registerFormSchema, RegisterFormValues } from "../schemas/registerFormSchema";
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from "../formFields";
import { Button } from "@/components/ui/button";
import { registerUser } from "@/app/actions";

export const RegisterForm = () => {
    const form = useForm<RegisterFormValues>({
        defaultValues: {
            userName: '',
            userEmail: '',
            userPassword: '',
            retypePassword: ''
        },
        resolver: zodResolver(registerFormSchema),
    });

    const onRegister = async (data: RegisterFormValues) => {
        try {
            await registerUser({
                userEmail: data.userEmail,
                userName: data.userName,
                userPassword: data.userPassword,
            });

            // toast.success("Регистрация успешна. На почту пришло письмо для подтверждения регистрации");

            //  onClose?.();
        } catch (error) {
            console.log(error);

            //  return toast.error("Неверный E-Mail или пароль");
        }
    }

    return <FormProvider {...form}>
        <form className='flex flex-col gap-4 mt-4' onSubmit={form.handleSubmit((data) => console.log(data))}>

            <FormInput name="userName" placeholder="Имя" type="text" />
            <FormInput name="userEmail" placeholder="Почта" type="email" />
            <FormInput name="userPassword" placeholder="Пароль" type="password" />
            <FormInput name="retypePassword" placeholder="Повторите пароль" type="password" />

            <Button type="submit">Зарегистрироваться</Button>

        </form>
    </FormProvider>
}