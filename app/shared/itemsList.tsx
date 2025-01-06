'use client';

import { useEffect } from "react";
import { Item } from "../types"
import { Preview } from "./preview"

type ItemsListProps = {
    data: Array<Item>
}

export const ItemsList = ({ data }: ItemsListProps) => {

    const fetchItems = async () => {
        const res = await fetch('http://localhost:3000/api/items', { method: 'GET' });
        const items = await res.json();
        console.log('items', items);
        return items;

    }

    useEffect(() => {
        fetchItems();
    }, [])


    return <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
        {
            data.map((item) => (
                <Preview key={item.id} item={item} />
            ))
        }

    </div>
}