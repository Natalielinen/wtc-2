import { CategoriesEnum, GenreEnum, userItems } from "@/server/schema";
import { InferInsertModel } from "drizzle-orm";

// тип = union из элементов массива
export type Genre = (typeof GenreEnum.enumValues)[number];
export type Category = (typeof CategoriesEnum.enumValues)[number];

export type Item = InferInsertModel<typeof userItems>

// то что отправляется на бек
export type ItemFields = {
    category: Category;
    genre: Genre;
    sourceLink: string;
    name: string;
    imageUrl?: string;
    lastVisited?: Date;
    userId: string;
}

export type User = {
    id: string;
    userName: string;
    userEmail: string;
    userPassword: string;
    userItems: Item[];
}

export type Film = {
    kinopoiskId: number;
    imdbId: number | null;
    nameRu: string | null;
    nameEn: string | null;
    nameOriginal: string | null;
    countries: 
        {
            country: string;
        }[];
    genres: 
        {
            genre: string
        }[]; 
    ratingKinopoisk: number | null;
    ratingImdb: number | null;
    year: number | null;
    type: string | null;
    posterUrl: string;
    posterUrlPreview: string;

}

export type UserCreateBodyType =  {
    userName: string;
    userEmail: string;
    userPassword: string;
}

