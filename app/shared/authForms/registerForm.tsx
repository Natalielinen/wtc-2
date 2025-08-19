'use client';

import { FormProvider, useForm } from "react-hook-form";
import { registerFormSchema, RegisterFormValues } from "../schemas/registerFormSchema";
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from "../formFields";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { emailSignin } from "@/server/actions/email-signin";
import { Eye, EyeOff } from "lucide-react";

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
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showRetypePassword, setShowRetypePassword] = useState<boolean>(false);

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const toggleShowPassword = (isOff: boolean = false, retype: boolean = false) => {
        if (retype) {
            setShowRetypePassword(isOff);
        } else {
            setShowPassword(isOff);
        }
    }

    const { execute, status } = useAction(emailSignin, {
        onSuccess: (data) => {
            console.log(data);
        }
    });

    const onRegister = async (data: RegisterFormValues) => {
        execute(data);
        toast.success('Пользователь успешно зарегистрирован');
    }

    return <FormProvider {...form}>
        <form className='flex flex-col gap-4 mt-4' onSubmit={form.handleSubmit(onRegister)}>

            <FormInput name="userName" placeholder="Имя" type="text" />
            <FormInput name="userEmail" placeholder="Почта" type="email" />
            <FormInput name="userPassword" placeholder="Пароль" type="password" icon={!showPassword
                ? <Eye onClick={() => toggleShowPassword(true)} />
                : <EyeOff onClick={() => toggleShowPassword(false)} />} />
            <FormInput name="retypePassword" placeholder="Повторите пароль" type="password" icon={!showRetypePassword
                ? <Eye onClick={() => toggleShowPassword(true, true)} />
                : <EyeOff onClick={() => toggleShowPassword(false, true)} />} />

            <Button type="submit" disabled={form.formState.isSubmitting}>Зарегистрироваться</Button>

        </form>
    </FormProvider>
}