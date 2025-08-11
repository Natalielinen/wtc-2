'use client';

import { Button } from "@/components/ui/button"
import { Clapperboard, Gamepad2, Moon, Settings, Sun } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes";
import Link from "next/link";
import { useState } from "react";
import { AddItemModal } from "./addItemModal";
import { LoginModal } from "./loginModal";
import { useUserStore } from "../stores/userStore";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";
import Image from "next/image";

export const Header = ({ session }: { session: Session | null }) => {
    // Данные и состояние
    const { setOpenLoginModal } = useUserStore((state) => state);
    const { setTheme, theme } = useTheme();
    const [showModal, setShowModal] = useState<boolean>(false);

    // Получение и обработка данных
    const logout = async () => {
        try {
            signOut();
            toast.success("Вы вышли из аккаунта");
        } catch (error) {
            console.error("Error [LOGOUT]", error);
            toast.error("Ошибка при выходе");
        }
    };

    // Взаимодействие с UI
    const onThemeChange = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    };

    const onLoginClick = () => {
        if (!session) {
            setOpenLoginModal(true);
        } else {
            logout();
        }
    };

    // UI
    return <header className="flex justify-between mb-8">
        <div className="flex gap-4">
            <Link href="/chooseMovie">
                <Button variant="outline" disabled={!session}>
                    <Clapperboard />
                </Button>
            </Link>

            <Link href="/chooseGame">
                <Button variant="outline" disabled={!session}>
                    <Gamepad2 />
                </Button>
            </Link>
        </div>

        <div>
            <DropdownMenu >
                <DropdownMenuTrigger className="flex gap-2">
                    {
                        session ? <p>{session?.user?.name}</p> : null
                    }
                    <Settings />
                    {/* <Image src={session?.user?.image || ''} alt="avatar" width={30} height={30} /> */}
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={onThemeChange} className="cursor-pointer">
                        {
                            theme === 'dark'
                                ? <p className="flex gap-2"> <p>Светлая</p>  <Sun size={18} /></p>
                                : <p className="flex gap-2"> <p>Темная</p>  <Moon size={18} /></p>
                        }
                    </DropdownMenuItem>
                    {
                        session && <>
                            <DropdownMenuItem className="cursor-pointer">
                                <Link href="/profile">
                                    Профиль
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer" onClick={() => setShowModal(true)}>Добавить</DropdownMenuItem>
                        </>
                    }
                    <DropdownMenuItem className="cursor-pointer" onClick={onLoginClick}>{session ? 'Выйти' : 'Войти'}</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>

        <AddItemModal openAddModal={showModal} setShow={setShowModal} />
        <LoginModal />
    </header>
}