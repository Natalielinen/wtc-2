'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { LoginForm, RegisterForm } from "./authForms";

type LoginModalProps = {
    openLoginModal: boolean;
    setOpenLoginModal: (open: boolean) => void
}

export const LoginModal = ({ openLoginModal, setOpenLoginModal }: LoginModalProps) => {
    // Данные и состояние
    const [registerForm, setRegisterForm] = useState<boolean>(false);

    // Взаимодействие с UI
    const onAuthModalClose = () => setOpenLoginModal(false);

    return <Dialog open={openLoginModal} onOpenChange={onAuthModalClose}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    {!registerForm ? 'Войти' : 'Регистрация'}
                </DialogTitle>
                <DialogDescription>
                    {
                        !registerForm ? <LoginForm onAuthModalClose={onAuthModalClose} /> : <RegisterForm onAuthModalClose={onAuthModalClose} />
                    }
                    {
                        <Button type="button" className="w-full mt-4" onClick={() => setRegisterForm(!registerForm)}>{!registerForm ? 'Регистрация' : 'Войти'}</Button>
                    }

                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
}