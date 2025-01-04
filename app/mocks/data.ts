import {  Item, Option } from "../types";

export const mockCategories: Array<Option> = [
    {
        value: '1',
        label: "Все"
    },
    {
        value: '2',
        label: "Фильмы"
    },
    {
        value: '3',
        label: "Игры"
    },
]

export const mockgenres: Array<Option> = [
    {
        value: '0',
        label: "Все"
    },
    {
        value: '1',
        label: "Ужасы"
    },
    {
        value: '2',
        label: "Фантастика"
    },
     {
        value: '3',
        label: "мультфильм"
    },
    {
        value: '4',
        label: "фэнтези"
    },
    {
        value: '5',
        label: "комедия"
    },
    {
        value: '6',
        label: "семейный"
    },
     {
        value: '7',
        label: "мюзикл"
    },
    {
        value: '8',
        label: "приключения"
    },
    
]

export const mockdata: Array<Item> = [
    {
        id: 1,
        category: mockCategories[1],
        genre: mockgenres.slice(2, 6),
        name: 'Губка Боб квадратные штаны',
        sourceLink: 'https://kadikama.com/144-2000-gubka-bob-kvadratnye-shtany.html',
        imageUrl: 'https://kadikama.com/uploads/posts/2022-06/gubka-bob-kvadratnye-shtany.jpg',
        lastVisited: new Date(),

    },
    {
        id: 2,
        category: mockCategories[1],
        genre: mockgenres.slice(2, 6),
        name: 'Крутые бобры',
        sourceLink: 'https://kadikama.com/447-1997-krutye-bobry.html',
        imageUrl: 'https://kadikama.com/uploads/posts/2017-02/1486997615_poster-228885.jpg',
        lastVisited: new Date(),

    },
    {
        id: 3,
        category: mockCategories[1],
        genre: mockgenres.slice(2),
        name: 'My Little Pony: Зажги свою искорку',
        sourceLink: 'https://kadikama.com/9479-2022-my-little-pony-zazhgi-svoju-iskorku.html',
        imageUrl: 'https://kadikama.com/uploads/posts/2022-08/1659641394-1824198787-my-little-pony-zazhgi-svoyu-iskorku.jpg',
        lastVisited: new Date(),

    },
      {
        id: 4,
        category: mockCategories[1],
        genre: mockgenres.slice(2),
        name: 'My Little Pony: Новое поколение',
        sourceLink: 'https://kadikama.com/8760-2021-my-little-pony-novoe-pokolenie.html',
        imageUrl: 'https://kadikama.com/uploads/posts/2021-11/1638263827-1621246153-my-little-pony-novoe-pokolenie.jpg',
        lastVisited: new Date(),

    },
    {
        id: 5,
        category: mockCategories[1],
        genre: [mockgenres[2], mockgenres[5]],
        name: 'Дружные мопсы',
        sourceLink: 'https://kadikama.com/3719-2017-druzhnye-mopsy.html',
        imageUrl: 'https://kadikama.com/uploads/posts/2018-09/1535866947-776614361-druzhnye-mopsy.jpg',
        lastVisited: new Date(),

    },


]

export const mockGames: Array<Item> = [
     {
        id: 11,
        category: mockCategories[2],
        genre: [],
        name: 'Goat Simulator',
        sourceLink: 'https://store.steampowered.com/app/1762930/Goat_Simulator_Remastered/',
        imageUrl: 'https://www.trainerscity.org/uploads/thumbs/1545f4fdd-1.jpg',
        lastVisited: new Date(),

    },
]