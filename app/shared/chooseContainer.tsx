'use client';

import { Button } from "@/components/ui/button"
import { ArrowLeft, FileQuestion } from "lucide-react"
import Link from "next/link"
import { Category, Item } from "../types"
import { useEffect, useState } from "react"
import { ChoosenItem } from "./choosenItem";
import { useUserStore } from "../stores/userStore";

type ChooseContainerProps = {
    buttonText: string,
    category: Category,
}

export const ChooseContainer = ({ buttonText, category }: ChooseContainerProps) => {

    const [choosenItem, setChosenItem] = useState<Item | null>(null);
    const [data, setData] = useState<Array<Item>>([]);

    const user = useUserStore((state) => state.currentUser);

    useEffect(() => {
        switch (category) {
            case "фильмы":
                setData(user?.userItems.filter((item) => item.category === "фильмы") || []);
                break;
            case "игры":
                setData(user?.userItems.filter((item) => item.category === "игры") || []);
                break;
        }
    }, [category, user?.userItems])

    const onChooseItem = () => {
        const randomIndex = Math.floor(Math.random() * data.length);

        setChosenItem(data[randomIndex])

    }

    return (
        <div className="w-2/4 mx-auto flex flex-col  gap-6 items-center h-screen p-4">
            <Link href="/">
                <Button>
                    <ArrowLeft />
                </Button>
            </Link>
            <Button onClick={onChooseItem}>
                {buttonText}
            </Button>
            {
                choosenItem
                    ? <ChoosenItem item={choosenItem} />
                    : <FileQuestion size={100} />
            }
        </div>
    )
}