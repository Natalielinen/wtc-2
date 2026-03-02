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
import { useLanguage } from "@/app/providers/LanguageProvider";
import { Lang, translation } from "@/translation/translation";

type RegisterFormProps = {
    onAuthModalClose: () => void;
};

export const RegisterForm = ({ onAuthModalClose }: RegisterFormProps) => {
    const { lang } = useLanguage();
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
        retype: boolean = false,
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
                    `${translation[lang as Lang].user} ${data?.input?.userName} ${translation[lang as Lang].successfullyRegistered}.
                     ${translation[lang as Lang].emailSent}`,
                    { duration: 5000 },
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
                <FormInput name="userName" placeholder={translation[lang as Lang].name} type="text" autoComplete="off" />
                <FormInput name="userEmail" placeholder={translation[lang as Lang].email} type="email" autoComplete="off" />
                <FormInput
                    name="userPassword"
                    placeholder={translation[lang as Lang].password}
                    type={showPassword ? "text" : "password"}
                    autoComplete="off"
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
                    placeholder={translation[lang as Lang].retypePassword}
                    type={showRetypePassword ? "text" : "password"}
                    autoComplete="off"
                    icon={
                        !showRetypePassword ? (
                            <Eye onClick={() => toggleShowPassword(true, true)} />
                        ) : (
                            <EyeOff onClick={() => toggleShowPassword(false, true)} />
                        )
                    }
                />

                <Button type="submit" disabled={status === "executing"}>
                    {translation[lang as Lang].signup}
                </Button>
            </form>
        </FormProvider>
    );
};
