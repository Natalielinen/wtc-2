"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LoginForm, RegisterForm } from "./authForms";
import { useUserStore } from "../stores/userStore";
import { useLanguage } from "../providers/LanguageProvider";
import { Lang, translation } from "@/translation/translation";

export const LoginModal = () => {
    const { lang } = useLanguage();
    // Данные и состояние

    const { openLoginModal, registerForm, setRegisterForm, setOpenLoginModal } = useUserStore((state) => state);


    // Взаимодействие с UI
    const onAuthModalClose = () => {
        setOpenLoginModal(false);
        setRegisterForm(false);
    };

    return (
        <Dialog open={openLoginModal} onOpenChange={onAuthModalClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {!registerForm
                            ? translation[lang as Lang].signIn
                            : translation[lang as Lang].signUp}
                    </DialogTitle>
                    <DialogDescription>
                        {!registerForm ? (
                            <LoginForm onAuthModalClose={onAuthModalClose} />
                        ) : (
                            <RegisterForm onAuthModalClose={onAuthModalClose} />
                        )}
                        {
                            <Button
                                type="button"
                                className="w-full mt-4"
                                onClick={() => setRegisterForm(!registerForm)}
                            >
                                {!registerForm
                                    ? translation[lang as Lang].signUp
                                    : translation[lang as Lang].signIn}
                            </Button>
                        }
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
