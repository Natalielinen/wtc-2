'use client';

import { FormProvider, useForm } from "react-hook-form";
import { registerFormSchema, RegisterFormValues } from "../schemas/registerFormSchema";
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from "../formFields";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

type RegisterFormProps = {
    onAuthModalClose: () => void;
}

export const RegisterForm = ({ onAuthModalClose }: RegisterFormProps) => {
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

        const body = {
            userName: data.userName,
            userEmail: data.userEmail,
            userPassword: data.userPassword
        }

        const res = await fetch('http://localhost:3000/api/register', { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } });


        if (res) {
            onAuthModalClose();
            toast.success('Пользователь успешно зарегистрирован');
            // await signIn('credentials', { email: data.userEmail, password: data.userPassword });
        }

        onAuthModalClose();


    }

    return <FormProvider {...form}>
        <form className='flex flex-col gap-4 mt-4' onSubmit={form.handleSubmit(onRegister)}>

            <FormInput name="userName" placeholder="Имя" type="text" />
            <FormInput name="userEmail" placeholder="Почта" type="email" />
            <FormInput name="userPassword" placeholder="Пароль" type="password" />
            <FormInput name="retypePassword" placeholder="Повторите пароль" type="password" />

            <Button type="submit" disabled={form.formState.isSubmitting}>Зарегистрироваться</Button>

        </form>
    </FormProvider>
}