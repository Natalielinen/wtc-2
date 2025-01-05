'use client';

import { FormProvider, useForm } from "react-hook-form";
import { registerFormSchema, RegisterFormValues } from "../schemas/registerFormSchema";
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from "../formFields";
import { Button } from "@/components/ui/button";

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