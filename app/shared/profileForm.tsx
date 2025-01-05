'use client';

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { profileFormSchema, ProfileFormValues } from "./schemas/profileFormSchema";
import { FormInput } from "./formFields";
import { Button } from "@/components/ui/button";

export const ProfileForm = () => {

    const form = useForm<ProfileFormValues>({
        defaultValues: {
            userName: '',
            userEmail: '',
            userPassword: '',
        },
        resolver: zodResolver(profileFormSchema),
    });

    return <FormProvider {...form}>
        <form className='flex flex-col gap-4 mt-4' onSubmit={form.handleSubmit((data) => console.log(data))}>


            <FormInput name="userName" placeholder="Имя" />
            <FormInput name="userEmail" placeholder="Почта" type="email" />
            <FormInput name="userPassword" placeholder="Пароль" type="password" />

            <Button type="submit">Сохранить</Button>
        </form>
    </FormProvider>
}