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

type BtnVariant = "outline" | "link" | "default" | "destructive" | "secondary" | "ghost" | null | undefined

export const Filters = () => {

    const [btnVariant, setBtnVariant] = useState<BtnVariant>("outline")

    const onLongTimeNoWatch = () => {
        if (btnVariant === "outline") {
            setBtnVariant("default");
        } else {
            setBtnVariant("outline");
        }

    }

    return <div className="flex justify-between my-8">
        <div className="flex gap-4" >
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Жанр" />
                </SelectTrigger>
                <SelectContent>
                    {
                        genres.map(genre => <SelectItem key={genre} value={genre}>{genre}</SelectItem>)
                    }
                </SelectContent>
            </Select>

            <Select>
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