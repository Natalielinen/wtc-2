'use client';

import Link from "next/link";
import { Item } from "../types";
import { Pencil, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AddItemModal } from "./addItemModal";


type PreviewProps = {
    item: Item;
}

export const Preview = ({ item }: PreviewProps) => {
    const [show, setShow] = useState(false);
    return <>
        <div className="relative rounded-2xl cursor-pointer overflow-hidden group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={item.imageUrl}
                alt={item.name}
                className="rounded-2xl cursor-pointer w-full h-[200px] object-cover"
            />
            <div className=" absolute top-full left-0 w-full h-full bg-gray-500 bg-opacity-50 z-10 rounded-2xl cursor-pointer transition-all duration-500 ease-in-out group-hover:top-0">
                <div className="text-white  h-[100%] flex flex-col gap-8">
                    <div className="bg-black bg-opacity-50 p-4 flex justify-between ">
                        <p>{item.name}</p>
                        <Button variant="ghost" onClick={() => setShow(true)}>
                            <Pencil />
                        </Button>

                    </div>
                    <div>
                        <Link href={item.sourceLink} target="_blank">
                            <Play size={48} className="justify-self-center" />
                        </Link>

                    </div>
                </div>

            </div>
        </div>
        <AddItemModal openAddModal={show} setShow={setShow} editValues={{
            category: item.category.value,
            genre: item.genre[0]?.value,
            sourceLink: item.sourceLink,
            name: item.name,
            imageUrl: item.imageUrl

        }} editMode />
    </>


};
