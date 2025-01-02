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
import { mockCategories, mockgenres } from "../mocks/data"
import { useState } from "react"

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
                        mockgenres.map(genre => <SelectItem key={genre.id} value={String(genre.id)}>{genre.name}</SelectItem>)
                    }
                </SelectContent>
            </Select>

            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Категория" />
                </SelectTrigger>
                <SelectContent>
                    {
                        mockCategories.map(cat => <SelectItem key={cat.id} value={String(cat.id)}>{cat.name}</SelectItem>)
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