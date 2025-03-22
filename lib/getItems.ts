import { db } from "@/app/constants/firebaseConfig";
import { Category, Genre, Item } from "@/app/types";
import { collection, getDocs, orderBy, query, where } from "@firebase/firestore";

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


   const itemsRef = collection(db, "item");

    let q = query(itemsRef, where("userId", "==", userId));

    // Фильтрация по категории, если она указана
    if (category !== "все") {
        q = query(q, where("category", "==", category));
    }

    // Фильтрация по жанру, если он указан
    if (genre !== "все") {
        q = query(q, where("genre", "==", genre));
    }

     if (sortByDate) {
        q = query(q, orderBy("lastVisited", "asc"));
    }

    const itemsSnap = await getDocs(q);
    
    const userItems: Item[] = itemsSnap.docs.map((doc) => ({
        id: doc.id,
        category: doc.data().category,
        genre: doc.data().genre,
        name: doc.data().name,
        sourceLink: doc.data().sourceLink,
        imageUrl: doc.data().imageUrl,
        lastVisited: doc.data().lastVisited,
    }));

    return userItems;
    
}