"use client";

import Link from "next/link";
import { Item } from "../types";
import { Pencil, Play, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
import React from "react";
import { format } from "date-fns";
import { editItem } from "@/server/actions/edit-item";
import { updateWatchCount } from "@/server/actions/update-watch-count";

const AddItemModal = React.lazy(() => import("./addItemModal"));
const ConfirmDeleteModal = React.lazy(() => import("./confirmDeleteModal"));

type PreviewProps = {
    item: Item;
};

export const Preview = ({ item }: PreviewProps) => {
    // Данные и состояние
    const [show, setShow] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

    // Взаимодействие с UI
    const onPlayClick = async () => {
        try {
            if (!item.id) {
                return;
            }

            editItem({
                id: item.id,
                lastVisited: new Date(),
            });

            updateWatchCount(item.id);
        } catch (error) {
            toast.error(`Ошибка при обновлении элемента: ${error}`);
            throw error;
        }
    };

    // UI
    return (
        <>
            <div className="relative rounded-2xl cursor-pointer overflow-hidden group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="rounded-2xl cursor-pointer w-full h-[200px] object-cover"
                />
                <div className="absolute top-full left-0 w-full h-full bg-gray-500 bg-opacity-50 z-10 rounded-2xl cursor-pointer transition-all duration-500 ease-in-out group-hover:top-0">
                    <div className="text-white  h-[100%] flex flex-col gap-8">
                        <div className="bg-black bg-opacity-50 p-4 flex justify-between">
                            <p>
                                <p>{item.name}</p>
                                <p>
                                    {" "}
                                    Дата просмотра: {format(item?.lastVisited || new Date(), "dd.MM.yyyy")}
                                </p>
                                <p> Просмотрен {item.watchCount} раз</p>
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
                                <Play
                                    size={48}
                                    className="justify-self-center"
                                    onClick={onPlayClick}
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <AddItemModal
                openAddModal={show}
                setShow={setShow}
                editValues={{
                    category: item.category || "все",
                    genre: item.genre || "все",
                    sourceLink: item.sourceLink,
                    name: item.name,
                    imageUrl: item.imageUrl,
                }}
                itemId={item.id}
                editMode
            />

            <ConfirmDeleteModal
                id={item.id || ""}
                name={item.name}
                openDeleteModal={showDeleteModal}
                setShow={setShowDeleteModal}
            />
        </>
    );
};
