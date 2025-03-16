import { db } from "@/app/constants/firebaseConfig";
import { Item } from "@/app/types";
import { collection, getDocs, query, where } from "@firebase/firestore";

export const getUsetItems = async (userId: string) => {
    const itemsRef = collection(db, "item");
    const q = query(itemsRef, where("userId", "==", userId));
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