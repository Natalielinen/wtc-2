/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FormProvider, useForm } from "react-hook-form"
import { loginFormSchema, LoginFormValues } from "../schemas/loginFormSchema";
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button";
import { FormInput } from "../formFields";
import { auth, db } from '../../constants/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
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
            const userCredential = await signInWithEmailAndPassword(auth, data.userEmail, data.userPassword);
            const firebaseUser = userCredential.user;

            // Получаем данные пользователя из Firestore
            const userRef = doc(db, "user", firebaseUser.uid);

            const userSnap = await getDoc(userRef);

            if (!userSnap.exists()) {
                throw new Error("Пользователь не найден в базе");
            }

            const userData = userSnap.data();

            const itemsRef = collection(db, "item");
            const q = query(itemsRef, where("userId", "==", firebaseUser.uid));
            const itemsSnap = await getDocs(q);

            // @ts-ignore
            const userItems: Item[] = itemsSnap.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            // Сохраняем пользователя в Zustand
            setUser({
                id: userData.uid,
                userName: userData.displayName,
                userEmail: userData.email,
                userPassword: "", // Пароль хранить не нужно
                userItems,
            });

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