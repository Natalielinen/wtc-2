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
import { AddItemModal } from "./addItemModal";
import { useState } from "react";

export const Header = () => {

    const { setTheme, theme } = useTheme();

    const [showModal, setShowModal] = useState(false);

    const onThemeChange = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
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
                    <DropdownMenuItem className="cursor-pointer">Профиль</DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={() => setShowModal(true)}>Добавить</DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">Выйти</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </div>
        <AddItemModal openAddModal={showModal} setShow={setShowModal} />
    </header>
}