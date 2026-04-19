"use client";

import { Item } from "../types";
import { Pencil, Play, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
import React from "react";
import { format } from "date-fns";
import { editItem } from "@/server/actions/edit-item";
import { updateWatchCount } from "@/server/actions/update-watch-count";
import { SelectLinkModal } from "./selectLinkModal";
import { useLanguage } from "../providers/LanguageProvider";
import { Lang, translation } from "@/translation/translation";

const AddItemModal = React.lazy(() => import("./addItemModal"));
const ConfirmDeleteModal = React.lazy(() => import("./confirmDeleteModal"));

type PreviewProps = {
    item: Item;
};

export const Preview = ({ item }: PreviewProps) => {
    const { lang } = useLanguage();
    // Данные и состояние
    const [show, setShow] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [showSelectLinkModal, setShowSelectLinkModal] = useState<boolean>(false);

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
            toast.error(`${translation[lang as Lang].updateElementError} ${error}`);
            throw error;
        }
    };

    const onLinkClick = (link: string) => {
        const linksArray = link.split(",");

        if (linksArray.length === 1) {
            window.open(link, "_blank");
            onPlayClick();
        } else {
            setShowSelectLinkModal(true);
        }

    }

    // UI
    return (
        <>
            <div className="relative rounded-2xl cursor-pointer overflow-hidden group min-w-[200px] h-[450px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="rounded-2xl cursor-pointer w-full h-full object-cover object-top"
                />
                <div className="absolute top-full left-0 w-full h-full bg-gray-500 bg-opacity-50 z-10 rounded-2xl cursor-pointer transition-all duration-500 ease-in-out group-hover:top-0">
                    <div className="text-white  h-[100%] flex flex-col gap-8">
                        <div className="bg-black bg-opacity-50 p-4 ">
                            <div className="flex justify-between items-center">
                                <p className="font-bold">{item.name}</p>
                                <div className="flex gap-2 w-[30%]">
                                    <Button variant="ghost" onClick={() => setShow(true)}>
                                        <Pencil />
                                    </Button>

                                    <Button variant="ghost" onClick={() => setShowDeleteModal(true)}>
                                        <Trash2 />
                                    </Button>
                                </div>
                            </div>
                            <p>
                                <p className="text-sm">
                                    {translation[lang as Lang].watchDate} {format(item?.lastVisited || new Date(), "dd.MM.yyyy")}
                                </p>
                                <p className="text-sm"> {translation[lang as Lang].watched} {item.watchCount} {translation[lang as Lang].times}</p>
                            </p>


                        </div>
                        <div className="flex items-center justify-center flex-1">
                            <button onClick={() => onLinkClick(item.sourceLink)} className="justify-self-center background-transparent border-0" >
                                <Play
                                    size={60}
                                />
                            </button>
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

            <SelectLinkModal
                openLinkDialog={showSelectLinkModal}
                setShow={setShowSelectLinkModal}
                links={item.sourceLink.split(",")}
                onPlayClick={onPlayClick}
            />
        </>
    );
};
