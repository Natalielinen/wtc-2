'use client';

import { Item } from "../types"
import { Preview } from "./preview"

type ItemsListProps = {
    data: Array<Item>
}

export const ItemsList = ({ data }: ItemsListProps) => {

    return <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
        {
            data.map((item) => (
                <Preview key={item.id} item={item} />
            ))
        }

    </div>
}