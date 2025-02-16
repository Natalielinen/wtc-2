'use client';

import { useEffect } from "react";
import { Item } from "../types"
import { Preview } from "./preview"
import { db } from "../constants/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

type ItemsListProps = {
    data: Array<Item>
}

export const ItemsList = ({ data }: ItemsListProps) => {

    //console.log('db', db);



    useEffect(() => {
        const itemsCollection = collection(db, 'item');

        console.log('itemsCollection', itemsCollection);

        getDocs(itemsCollection).then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
            });
        }).catch((error) => {
            console.error('Error fetching items:', error)
        });
    }, [])



    return <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
        {
            data.map((item) => (
                <Preview key={item.id} item={item} />
            ))
        }

    </div>
}