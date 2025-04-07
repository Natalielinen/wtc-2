'use client';

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { profileFormSchema, ProfileFormValues } from "./schemas/profileFormSchema";
import { FormInput } from "./formFields";
import { Button } from "@/components/ui/button";
import { useUserStore } from "../stores/userStore";
import { useEffect } from "react";

export const ProfileForm = () => {

    // Данные и состояние
    const form = useForm<ProfileFormValues>({
        defaultValues: {
            userName: '',
            userEmail: '',
            userPassword: '',
        },
        resolver: zodResolver(profileFormSchema),
    });

    const user = useUserStore((state) => state.currentUser);

    // Получение и обработка данных
    useEffect(() => {
        if (user) {
            form.reset({
                userName: user.userName,
                userEmail: user.userEmail,
                userPassword: user.userPassword
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    // UI
    return <FormProvider {...form}>
        <form className='flex flex-col gap-4 mt-4' onSubmit={form.handleSubmit((data) => console.log(data))}>


            <FormInput name="userName" placeholder="Имя" />
            <FormInput name="userEmail" placeholder="Почта" type="email" />
            <FormInput name="userPassword" placeholder="Пароль" type="password" />

            <Button type="submit">Сохранить</Button>
        </form>
    </FormProvider>
}