'use client';

import { FormProvider, useForm } from "react-hook-form";
import { registerFormSchema, RegisterFormValues } from "../schemas/registerFormSchema";
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from "../formFields";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { auth, db } from '../../constants/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from "@firebase/firestore";

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

        const userCredential = await createUserWithEmailAndPassword(auth, data.userEmail, data.userPassword);
        const user = userCredential.user;
        const uid = user.uid;

        await setDoc(doc(db, "user", uid), {
            uid: uid,
            email: data.userEmail,
            displayName: data.userName,
        });

        onAuthModalClose();
        toast.success('Пользователь успешно зарегистрирован');

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