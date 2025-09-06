"use client";

import { FormProvider, useForm } from "react-hook-form";
import {
    registerFormSchema,
    RegisterFormValues,
} from "../schemas/registerFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "../formFields";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { Eye, EyeOff } from "lucide-react";
import { emailRegister } from "@/server/actions/email-register";

type RegisterFormProps = {
    onAuthModalClose: () => void;
};

export const RegisterForm = ({ onAuthModalClose }: RegisterFormProps) => {
    const form = useForm<RegisterFormValues>({
        defaultValues: {
            userName: "",
            userEmail: "",
            userPassword: "",
            retypePassword: "",
        },
        resolver: zodResolver(registerFormSchema),
    });
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showRetypePassword, setShowRetypePassword] = useState<boolean>(false);

    const toggleShowPassword = (
        isOff: boolean = false,
        retype: boolean = false
    ) => {
        if (retype) {
            setShowRetypePassword(isOff);
        } else {
            setShowPassword(isOff);
        }
    };

    const { execute, status } = useAction(emailRegister, {
        onSuccess: (data) => {
            if (data?.data?.error) {
                toast.error(data.data.error, { duration: 5000 });
            }
            if (data?.data?.success) {
                toast.success(
                    `Пользователь ${data?.input?.userName} успешно зарегистрирован.
                     На указанную почту отправлено письмо с подтверждением`,
                    { duration: 5000 }
                );
                onAuthModalClose();
            }
        },
    });

    const onRegister = async (data: RegisterFormValues) => {
        execute(data);
    };

    return (
        <FormProvider {...form}>
            <form
                className="flex flex-col gap-4 mt-4"
                onSubmit={form.handleSubmit(onRegister)}
            >
                <FormInput name="userName" placeholder="Имя" type="text" />
                <FormInput name="userEmail" placeholder="Почта" type="email" />
                <FormInput
                    name="userPassword"
                    placeholder="Пароль"
                    type={showPassword ? "text" : "password"}
                    icon={
                        !showPassword ? (
                            <Eye onClick={() => toggleShowPassword(true)} />
                        ) : (
                            <EyeOff onClick={() => toggleShowPassword(false)} />
                        )
                    }
                />
                <FormInput
                    name="retypePassword"
                    placeholder="Повторите пароль"
                    type={showRetypePassword ? "text" : "password"}
                    icon={
                        !showRetypePassword ? (
                            <Eye onClick={() => toggleShowPassword(true, true)} />
                        ) : (
                            <EyeOff onClick={() => toggleShowPassword(false, true)} />
                        )
                    }
                />

                <Button type="submit" disabled={status === "executing"}>
                    Зарегистрироваться
                </Button>
            </form>
        </FormProvider>
    );
};
