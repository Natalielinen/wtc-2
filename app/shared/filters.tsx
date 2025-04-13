/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';

import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ClockArrowDown } from "lucide-react"
import { useState } from "react"
import { categories, genres } from "../constants/options";
import { useUserStore } from "../stores/userStore";
import { getUsetItems } from "@/lib/getItems";
import { Category, Genre } from "../types";

type BtnVariant = "outline" | "link" | "default" | "destructive" | "secondary" | "ghost" | null | undefined

export const Filters = () => {
    // Данные и состояние
    const [btnVariant, setBtnVariant] = useState<BtnVariant>("outline")
    const [sorted, setSorted] = useState<boolean>(false)

    const user = useUserStore((state) => state.currentUser);
    const setUser = useUserStore((state) => state.setCurrentUser);

    // Получение и обработка данных
    const onLongTimeNoWatch = async () => {
        if (btnVariant === "outline") {
            setBtnVariant("default");
            setSorted(true);
        } else {
            setBtnVariant("outline");
            setSorted(false);
        }

        const filteredItems = await getUsetItems({
            userId: user?.id || '',
            sortByDate: sorted
        });

        // Сохраняем пользователя в Zustand
        // @ts-ignore
        setUser({ ...user, userItems: filteredItems, });

    }

    const onGenreChange = async (genre: Genre) => {

        if (genre) {
            const filteredItems = await getUsetItems({
                userId: user?.id || '',
                genre
            });

            // Сохраняем пользователя в Zustand
            // @ts-ignore
            setUser({ ...user, userItems: filteredItems, });
        }

    }

    const onCategoryChange = async (category: Category) => {

        if (category) {
            const filteredItems = await getUsetItems({
                userId: user?.id || '',
                category
            });

            // Сохраняем пользователя в Zustand
            // @ts-ignore
            setUser({ ...user, userItems: filteredItems, });
        }

    }

    return <div className="flex justify-between my-8">
        <div className="flex gap-4" >
            <Select onValueChange={onGenreChange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Жанр" />
                </SelectTrigger>
                <SelectContent>
                    {
                        genres.map(genre => <SelectItem key={genre} value={genre}>{genre}</SelectItem>)
                    }
                </SelectContent>
            </Select>

            <Select onValueChange={onCategoryChange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Категория" />
                </SelectTrigger>
                <SelectContent>
                    {
                        categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)
                    }
                </SelectContent>
            </Select>

        </div >


        <Button
            title="Давно не смотрел(а)"
            variant={btnVariant}
            onClick={onLongTimeNoWatch}
        >
            <ClockArrowDown />
        </Button>
    </div >

}