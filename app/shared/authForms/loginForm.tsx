import { FormProvider, useForm } from "react-hook-form"
import { loginFormSchema, LoginFormValues } from "../schemas/loginFormSchema";
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button";
import { FormInput } from "../formFields";
import { auth } from '../../constants/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import toast from "react-hot-toast";

export const LoginForm = () => {
    const form = useForm<LoginFormValues>({
        defaultValues: {
            userEmail: '',
            userPassword: '',
        },
        resolver: zodResolver(loginFormSchema),
    });

    //TODO: переделать на firebase!!!! с монго одни проблемы
    const onLogin = async (data: LoginFormValues) => {
        try {

            await signInWithEmailAndPassword(auth, data.userEmail, data.userPassword);

            //  onClose?.();
            toast.success('Вы вошли в аккаунт');

        } catch (error) {
            console.error('Error [LOGIN]', error);
            toast.error('Не удалось войти в аккаунт');
        }
    }

    return <FormProvider {...form}>
        <form className='flex flex-col gap-4 mt-4' onSubmit={form.handleSubmit(onLogin)}>

            <FormInput name="userEmail" placeholder="Почта" />
            <FormInput name="userPassword" placeholder="Пароль" />

            <Button type="submit">Войти</Button>

        </form>
    </FormProvider>
}