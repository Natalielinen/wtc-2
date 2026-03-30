"use client";

import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ClockArrowDown, Trophy } from "lucide-react";
import { useState } from "react";
import { Category, Genre } from "../types";
import { CategoriesEnum, GenreEnum } from "@/server/schema";
import { useItemsStore } from "../stores/items-store";
import { filterItems } from "@/server/actions/filter-items";
import { SearchInputFilters } from "./search-item-filters";
import { useLanguage } from "../providers/LanguageProvider";
import { Lang, translation } from "@/translation/translation";

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
    const { lang } = useLanguage();
    // Данные и состояние
    const [btnVariant, setBtnVariant] = useState<BtnVariant>("outline");
    const [popularBtnVariant, setPopularBtnVariant] =
        useState<BtnVariant>("outline");
    const [sortByLastVisited, setSortByLastVisited] = useState(false);
    const [sortByPopular, setSortByPopular] = useState(false);
    const [selectedGenre, setSelectedGenre] = useState<Genre>(
        GenreEnum.enumValues[0],
    );

    const [selectedCategory, setSelectedCategory] = useState<Category>(
        CategoriesEnum.enumValues[0],
    );

    const { setItems } = useItemsStore((state) => state);

    const handleSortToggle = async (sortBy: "lastVisited" | "popular") => {
        let newSortByLastVisited = sortByLastVisited;
        let newSortByPopular = sortByPopular;

        if (sortBy === "lastVisited") {
            newSortByLastVisited = !sortByLastVisited;
            newSortByPopular = false;

            setBtnVariant(newSortByLastVisited ? "default" : "outline");
            setPopularBtnVariant("outline");
        }

        if (sortBy === "popular") {
            newSortByPopular = !sortByPopular;
            newSortByLastVisited = false;

            setPopularBtnVariant(newSortByPopular ? "default" : "outline");
            setBtnVariant("outline");
        }

        setSortByLastVisited(newSortByLastVisited);
        setSortByPopular(newSortByPopular);

        const filtered = await filterItems(
            selectedCategory,
            selectedGenre,
            newSortByLastVisited,
            newSortByPopular,
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
                        <SelectValue placeholder={translation[lang as Lang].genre} />
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
                        <SelectValue placeholder={translation[lang as Lang].category} />
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
                title={translation[lang as Lang].mostPopular}
                variant={popularBtnVariant}
                onClick={() => handleSortToggle("popular")}
                className="mr-4"
            >
                <Trophy />
            </Button>

            <Button
                title={translation[lang as Lang].haventWatchedLongTime}
                variant={btnVariant}
                onClick={() => handleSortToggle("lastVisited")}
            >
                <ClockArrowDown />
            </Button>
        </div>
    );
};
