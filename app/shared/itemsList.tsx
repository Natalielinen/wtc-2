'use client';

import { Preview } from "./preview"
import { useUserStore } from "../stores/userStore";

export const ItemsList = () => {
    // Данные и состояние
    const user = useUserStore((state) => state.currentUser);

    // UI
    return <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
        {
            user ? user.userItems.map((item) => (
                <Preview key={item.id} item={item} />
            )) : "Загрузка..."
        }

    </div>
}