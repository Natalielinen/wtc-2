"use client";

import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ClockArrowDown } from "lucide-react";
import { useState } from "react";
import { Category, Genre } from "../types";
import { CategoriesEnum, GenreEnum } from "@/server/schema";
import { useItemsStore } from "../stores/items-store";
import { filterItems } from "@/server/actions/filter-items";
import { SearchInputFilters } from "./search-item-filters";

type BtnVariant =
    | "outline"
    | "link"
    | "default"
    | "destructive"
    | "secondary"
    | "ghost"
    | null
    | undefined;

export const Filters = () => {
    // Данные и состояние
    const [btnVariant, setBtnVariant] = useState<BtnVariant>("outline");
    const [sortByLastVisited, setSortByLastVisited] = useState(false);
    const [selectedGenre, setSelectedGenre] = useState<Genre>(
        GenreEnum.enumValues[0]
    );

    const [selectedCategory, setSelectedCategory] = useState<Category>(
        CategoriesEnum.enumValues[0]
    );

    const { setItems } = useItemsStore((state) => state);

    const handleSortToggle = async () => {
        if (btnVariant === "outline") {
            setBtnVariant("default");
            setSortByLastVisited(true);
        } else {
            setBtnVariant("outline");
            setSortByLastVisited(false);
        }
        const newSortState = !sortByLastVisited;
        setSortByLastVisited(newSortState);

        const filtered = await filterItems(
            selectedCategory,
            selectedGenre,
            newSortState
        );
        setItems(filtered);
    };

    const onGenreChange = async (genre: Genre) => {
        setSelectedGenre(genre);

        if (genre) {
            const filteredItems = await filterItems(selectedCategory, genre);

            setItems(filteredItems);
        }
    };

    const onCategoryChange = async (category: Category) => {
        setSelectedCategory(category);

        if (category) {
            const filteredItems = await filterItems(category, selectedGenre);

            setItems(filteredItems);
        }
    };

    return (
        <div className="flex justify-between my-8">
            <div className="flex gap-4">
                <Select onValueChange={onGenreChange}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Жанр" />
                    </SelectTrigger>
                    <SelectContent>
                        {GenreEnum.enumValues.map((genre) => (
                            <SelectItem key={genre} value={genre}>
                                {genre}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select onValueChange={onCategoryChange}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Категория" />
                    </SelectTrigger>
                    <SelectContent>
                        {CategoriesEnum.enumValues.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                                {cat}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <SearchInputFilters />

            <Button
                title="Давно не смотрел(а)"
                variant={btnVariant}
                onClick={handleSortToggle}
            >
                <ClockArrowDown />
            </Button>
        </div>
    );
};
