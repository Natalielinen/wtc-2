'use client';

import { Button } from "@/components/ui/button"
import { ArrowLeft, FileQuestion } from "lucide-react"
import Link from "next/link"
import { Item } from "../types"
import { useState } from "react"
import { ChoosenItem } from "./choosenItem";

type ChooseContainerProps = {
    buttonText: string,
    data: Array<Item>
}

export const ChooseContainer = ({ buttonText, data }: ChooseContainerProps) => {

    const [choosenItem, setChosenItem] = useState<Item | null>(null);

    const onChooseItem = () => {
        const randomIndex = Math.floor(Math.random() * data.length);
        setChosenItem(data[randomIndex]);
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