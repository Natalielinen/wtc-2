

export type Category = {
    id: number;
    name: string;
}

export type Genre = {
    id: number;
    name: string;
}

export type Item = {
    id: number;
    category: Category;
    genre: Array<Genre>;
    sourceLink: string;
    name: string;
    imageUrl?: string;
    lastVisited?: Date;
}