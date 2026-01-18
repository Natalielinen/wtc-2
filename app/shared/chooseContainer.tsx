"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, FileQuestion } from "lucide-react";
import Link from "next/link";
import { Category, Item } from "../types";
import { useEffect, useState } from "react";
import { ChoosenItem } from "./choosenItem";
import { useItemsStore } from "../stores/items-store";
import { Session } from "next-auth";

type ChooseContainerProps = {
    buttonText: string;
    category: Category;
    session: Session | null;
};

export const ChooseContainer = ({
    buttonText,
    category,
    session,
}: ChooseContainerProps) => {
    const { items, fetchItems } = useItemsStore((state) => state);
    const [choosenItem, setChosenItem] = useState<Item | null>(null);
    const [data, setData] = useState<Array<Item>>([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchItems(session?.user?.id || "");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session]);

    useEffect(() => {
        return () => {
            setData([]);
            setChosenItem(null);
        };
    }, []);

    useEffect(() => {
        switch (category) {
            case "фильмы":
                setData(items.filter((item) => item.category === "фильмы") || []);
                break;
            case "игры":
                setData(items.filter((item) => item.category === "игры") || []);
                break;
        }
    }, [category, items]);

    const onChooseItem = () => {
        const randomIndex = Math.floor(Math.random() * data.length);
        setLoading(true);

        setChosenItem(data[randomIndex]);

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };

    if (items.length === 0) return <p>Вы еще ничего не добавили</p>

    return (
        <div className="w-2/4 mx-auto flex flex-col  gap-6 items-center h-screen p-4">
            <Link href="/">
                <Button>
                    <ArrowLeft />
                </Button>
            </Link>
            <Button onClick={onChooseItem}>{buttonText}</Button>
            {choosenItem ? (
                <ChoosenItem item={choosenItem} loading={loading} />
            ) : (
                <FileQuestion size={100} />
            )}
        </div>
    );
};
