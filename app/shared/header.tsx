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
import { User } from "../types";
import { LoginModal } from "./loginModal";


export const Header = () => {

    const { setTheme, theme } = useTheme();

    const [showModal, setShowModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    const [user, setMockUser] = useState<User | null>(null);

    // {
    //     id: 1,
    //     userName: 'username',
    //     userEmail: 'email',
    //     userPassword: 'password',
    //     uerItems: []
    // };

    const onThemeChange = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    const onLoginClick = () => {
        if (!user) {
            setShowLoginModal(true);
        } else {
            console.log('logout');
            setMockUser(null);

        }

    }

    return <header className="flex justify-between mb-8">
        <div className="flex gap-4">
            <Link href="/chooseMovie">
                <Button variant="outline">
                    <Clapperboard />
                </Button>
            </Link>

            <Link href="/chooseGame">
                <Button variant="outline">
                    <Gamepad2 />
                </Button>
            </Link>

        </div>
        <div>
            <DropdownMenu >
                <DropdownMenuTrigger>
                    <Settings />
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
                        user && <>
                            <DropdownMenuItem className="cursor-pointer">
                                <Link href="/profile">
                                    Профиль
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer" onClick={() => setShowModal(true)}>Добавить</DropdownMenuItem>
                        </>
                    }

                    <DropdownMenuItem className="cursor-pointer" onClick={onLoginClick}>{user ? 'Выйти' : 'Войти'}</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </div>
        <AddItemModal openAddModal={showModal} setShow={setShowModal} />
        <LoginModal openLoginModal={showLoginModal} setOpenLoginModal={setShowLoginModal} />
    </header>
}