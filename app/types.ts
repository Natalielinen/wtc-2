

export type Option = {
    value: string;
    label: string;
}


export type Item = {
    id: number;
    category: Option;
    genre: Array<Option>;
    sourceLink: string;
    name: string;
    imageUrl?: string;
    lastVisited?: Date;
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

