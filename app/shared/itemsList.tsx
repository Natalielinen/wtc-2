'use client';

import { useState } from "react"
import { Item } from "../types"
import { AddItemModal } from "./addItemModal"
import { Preview } from "./preview"

type ItemsListProps = {
    data: Array<Item>
}

export const ItemsList = ({ data }: ItemsListProps) => {

    const [show, setShow] = useState(false);

    return <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
        {
            data.map((item) => (
                <Preview key={item.id} item={item} setShow={setShow} />
            ))
        }
        <AddItemModal openAddModal={show} setShow={setShow} editMode />
    </div>
}