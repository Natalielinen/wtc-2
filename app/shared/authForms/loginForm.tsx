import { FormProvider, useForm } from "react-hook-form"
import { loginFormSchema, LoginFormValues } from "../schemas/loginFormSchema";
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button";
import { FormInput } from "../formFields";

export const LoginForm = () => {
    const form = useForm<LoginFormValues>({
        defaultValues: {
            userEmail: '',
            userPassword: '',
        },
        resolver: zodResolver(loginFormSchema),
    });

    return <FormProvider {...form}>
        <form className='flex flex-col gap-4 mt-4' onSubmit={form.handleSubmit((data) => console.log(data))}>

            <FormInput name="userEmail" placeholder="Почта" />
            <FormInput name="userPassword" placeholder="Пароль" />

            <Button type="submit">Войти</Button>

        </form>
    </FormProvider>
}