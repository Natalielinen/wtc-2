'use client';

import { FormProvider, useForm } from "react-hook-form"
import { loginFormSchema, LoginFormValues } from "../schemas/loginFormSchema";
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button";
import { FormInput } from "../formFields";
import toast from "react-hot-toast";
import { useUserStore } from "@/app/stores/userStore";
import { Item } from "@/app/types";
import { signIn } from "next-auth/react";
import { SocialButtons } from "./socialButtons";
import { Eye, EyeOff } from "lucide-react";
import { Fragment, useState } from "react";
import Link from "next/link";
import { useAction } from "next-safe-action/hooks";
import { emailSignin } from "@/server/actions/email-signin";

interface LoginForm {
    onAuthModalClose: () => void
}

export const LoginForm = ({ onAuthModalClose }: LoginForm) => {
    const setUser = useUserStore((state) => state.setCurrentUser);

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const form = useForm<LoginFormValues>({
        defaultValues: {
            userEmail: '',
            userPassword: '',
        },
        resolver: zodResolver(loginFormSchema),
    });

    const toggleShowPassword = (isOff: boolean = false) => setShowPassword(isOff);

    const { execute, status } = useAction(emailSignin, {});

    const onLogin = async (data: LoginFormValues) => {
        execute(data);
    }

    return <div className="flex flex-col gap-2 align-middle justify-center">
        <FormProvider {...form}>
            <form className='flex flex-col gap-4 mt-4' onSubmit={form.handleSubmit(onLogin)}>

                <FormInput name="userEmail" placeholder="Почта" type="email" autoComplete="email" />
                <FormInput
                    name="userPassword"
                    placeholder="Пароль"
                    type={showPassword ? "text" : "password"}
                    icon={!showPassword
                        ? <Eye onClick={() => toggleShowPassword(true)} />
                        : <EyeOff onClick={() => toggleShowPassword(false)} />}
                    autoComplete="password"
                />

                <Button type="submit" disabled={status === "executing"}>Войти</Button>

            </form>
        </FormProvider>
        <SocialButtons />
        <div className="text-center">
            <Link href="/auth/reset">Забыли пароль?</Link>
        </div>

    </div>
}