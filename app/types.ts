

export type Option = {
    value: string;
    label: string;
}


export type Item = {
    id: string;
    category: Option;
    genre: Array<Option>;
    sourceLink: string;
    name: string;
    imageUrl?: string;
    lastVisited?: Date;
}

export type User = {
    id: string;
    userName: string;
    userEmail: string;
    userPassword: string;
    userItems: Array<Item>;
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

