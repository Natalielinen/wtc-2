"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { useClickAway } from "react-use";
import { Search } from "lucide-react";
import { Item } from "../types";
import { useLanguage } from "../providers/LanguageProvider";
import { Lang, translation } from "@/translation/translation";

type SearchItemUIProps = {
    className?: string;
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    items: Item[];
    onClick: (item: Item) => void;
    setItems: React.Dispatch<React.SetStateAction<Item[]>>;
};

export const SearchItemUI: React.FC<SearchItemUIProps> = ({
    className,
    searchQuery,
    setSearchQuery,
    items,
    onClick,
    setItems,
}) => {
    const { lang } = useLanguage();

    const [focused, setFocused] = React.useState<boolean>(false);

    const itemsToShow = searchQuery.length === 0 ? items.slice(0, 10) : items;

    const ref = React.useRef<HTMLInputElement>(null);
    useClickAway(ref, () => setFocused(false));

    const onClickItem = (item: Item) => {
        setFocused(false);
        setSearchQuery(item.name);
        onClick(item);
        setItems([]);
    };

    return (
        <>
            {focused && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-30" />
            )}

            <div
                ref={ref}
                className={cn(
                    "flex rounded-2xl flex-1 justify-between relative h-11 z-30",
                    className,
                )}
            >
                <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />

                <input
                    className="rounded-2xl outline-none w-full pl-11 bg-gray-100"
                    type="text"
                    placeholder={translation[lang as Lang].searchMovie}
                    onFocus={() => setFocused(true)}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                {items.length > 0 && (
                    <div
                        className={cn(
                            "absolute w-full h-[300px] overflow-y-scroll bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30",
                            focused && "visible opacity-100 top-12",
                        )}
                    >
                        {itemsToShow.map((item) => (
                            <p
                                key={item.id}
                                className="flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10 cursor-pointer"
                                onClick={() => onClickItem(item)}
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    className="rounded-sm h-8 w-8"
                                    src={item.imageUrl}
                                    alt={item.name}
                                    width={32}
                                    height={32}
                                />
                                <span>{item.name}</span>
                            </p>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};
