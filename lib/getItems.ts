import { Category, Genre, Item } from "@/app/types";

type ParamsType = {
    userId: string;
    category?: Category;
    genre?: Genre;
    sortByDate?: boolean 
}

export const getUsetItems = async (params: ParamsType) => {

    const {
        userId,
        category = "все",
        genre = "все",
        sortByDate = false

    } = params;


    
    // const userItems: Item[] = itemsSnap.docs.map((doc) => ({
    //     id: doc.id,
    //     category: doc.data().category,
    //     genre: doc.data().genre,
    //     name: doc.data().name,
    //     sourceLink: doc.data().sourceLink,
    //     imageUrl: doc.data().imageUrl,
    //     lastVisited: doc.data().lastVisited,
    // }));

    return userItems;
    
}