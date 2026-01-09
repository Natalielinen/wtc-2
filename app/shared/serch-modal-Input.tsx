"use client";

import React from "react";
import { useDebounce } from "react-use";
import { Film, Item } from "../types";
import { GenreEnum } from "@/server/schema";
import { SearchItemUI } from "./search-item-ui";

interface Props {
    className?: string;
    onClick: (item: Item) => void;
}

export const SearchInput: React.FC<Props> = ({ onClick }) => {
    // Данные и состояние
    const [searchQuery, setSearchQuery] = React.useState<string>("");
    const [items, setItems] = React.useState<Item[]>([]);

    // Получение и обработка данных
    const getFilms = () => {
        fetch(
            "https://kinopoiskapiunofficial.tech/api/v2.2/films?page=1&keyword=" +
            searchQuery,
            {
                method: "GET",
                headers: {
                    "X-API-KEY": "fc40b735-f24a-4d1e-970e-eb87b98c8903",
                    "Content-Type": "application/json",
                },
            }
        )
            .then((res) => res.json())
            .then((json) =>
                setItems(
                    json.items.map((film: Film) => ({
                        id: film.kinopoiskId,
                        category: {
                            value: "1",
                            label: "Фильмы",
                        },
                        genre: [GenreEnum.enumValues[0]],
                        sourceLink: "",
                        name: film?.nameRu || film?.nameEn || film?.nameOriginal,
                        imageUrl: film?.posterUrl,
                    }))
                )
            )
            .catch((err) => console.log(err));
    };

    useDebounce(
        async () => {
            try {
                getFilms();
            } catch (e) {
                console.error(e);
            }
        },
        250,
        [searchQuery]
    );

    // UI
    return (
        <SearchItemUI
            items={items}
            onClick={onClick}
            searchQuery={searchQuery}
            setItems={setItems}
            setSearchQuery={setSearchQuery}
        />
    );
};
