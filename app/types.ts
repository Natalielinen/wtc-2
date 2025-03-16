
export type Genre = 'все' | 'ужасы' | 'фэнтези' | 'мультфильм' | 'фантастика' | 'комедия' | 'семейный' | 'драма' | 'боевик' | 'триллер' | 'мьюзикл' | "детектив";

export type Category = 'все' | 'фильмы' | 'игры';

export type Item = {
    id: string;
    category: Category;
    genre: Genre;
    sourceLink: string;
    name: string;
    imageUrl?: string;
    lastVisited?: Date;
}

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

