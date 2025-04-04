'use client';

import Link from "next/link";
import { Item } from "../types";
import { Pencil, Play, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AddItemModal } from "./addItemModal";
import { ConfirmDeleteModal } from "./confirmDeleteModal";
import toast from "react-hot-toast";
import { doc, updateDoc } from "@firebase/firestore";
import { db } from "../constants/firebaseConfig";


type PreviewProps = {
    item: Item;
}

export const Preview = ({ item }: PreviewProps) => {
    const [show, setShow] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const onPlayClick = async () => {
        try {
            if (!item.id) {
                return;
            }
            const itemRef = doc(db, "item", item.id);
            await updateDoc(itemRef, {
                ...item,
                lastVisited: new Date(),
            });

        } catch (error) {
            toast.error(`Ошибка при обновлении элемента: ${error}`);
            throw error;
        }
    }

    console.log('item', item);


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
                        <p>
                            <p>{item.name}</p>
                            {/* <p>{new Date(item.lastVisited?.seconds).toLocaleString()}</p> */}

                        </p>
                        <Button variant="ghost" onClick={() => setShow(true)}>
                            <Pencil />
                        </Button>

                        <Button variant="ghost" onClick={() => setShowDeleteModal(true)}>
                            <Trash2 />
                        </Button>

                    </div>
                    <div>
                        <Link href={item.sourceLink} target="_blank">
                            <Play size={48} className="justify-self-center" onClick={onPlayClick} />
                        </Link>

                    </div>
                </div>

            </div>
        </div>
        <AddItemModal
            openAddModal={show}
            setShow={setShow}
            editValues={{
                category: item.category,
                genre: item.genre,
                sourceLink: item.sourceLink,
                name: item.name,
                imageUrl: item.imageUrl

            }}
            itemId={item.id}
            editMode
        />

        <ConfirmDeleteModal
            id={item.id}
            name={item.name}
            openDeleteModal={showDeleteModal}
            setShow={setShowDeleteModal}

        />
    </>


};
