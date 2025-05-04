
import { FormProvider, useForm } from "react-hook-form"
import { loginFormSchema, LoginFormValues } from "../schemas/loginFormSchema";
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button";
import { FormInput } from "../formFields";
import toast from "react-hot-toast";
import { useUserStore } from "@/app/stores/userStore";
import { Item } from "@/app/types";

interface LoginForm {
    onAuthModalClose: () => void
}

export const LoginForm = ({ onAuthModalClose }: LoginForm) => {
    const setUser = useUserStore((state) => state.setCurrentUser);

    const form = useForm<LoginFormValues>({
        defaultValues: {
            userEmail: '',
            userPassword: '',
        },
        resolver: zodResolver(loginFormSchema),
    });

    const onLogin = async (data: LoginFormValues) => {
        try {


            // Сохраняем пользователя в Zustand
            // setUser({
            //     id: userData.uid,
            //     userName: userData.displayName,
            //     userEmail: userData.email,
            //     userPassword: "", // Пароль хранить не нужно
            //     userItems,
            // });

            toast.success("Вы вошли в аккаунт");
        } catch (error) {
            console.error("Error [LOGIN]", error);
            toast.error("Не удалось войти в аккаунт");
        } finally {
            onAuthModalClose();
        }
    }

    return <FormProvider {...form}>
        <form className='flex flex-col gap-4 mt-4' onSubmit={form.handleSubmit(onLogin)}>

            <FormInput name="userEmail" placeholder="Почта" type="email" />
            <FormInput name="userPassword" placeholder="Пароль" type="password" />

            <Button type="submit" disabled={form.formState.isSubmitting}>Войти</Button>

        </form>
    </FormProvider>
}