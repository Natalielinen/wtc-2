'use client';

import { Preview } from "./preview"
import { useUserStore } from "../stores/userStore";
import { Button } from "@/components/ui/button";
import React from "react";
import { Session } from "next-auth";

export const ItemsList = ({ session }: { session: Session | null }) => {
    // Данные и состояние
    const { setOpenLoginModal } = useUserStore((state) => state);

    const openLoginModal = () => setOpenLoginModal(true);

    // UI
    return session ? <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
        user items
        {/* {
            user.userItems.map((item) => (
                <Preview key={item.id} item={item} />
            ))
        } */}

    </div> : <p>
        <Button variant="link" onClick={openLoginModal}>Войдите</Button>
        или
        <Button variant="link" onClick={openLoginModal}>Зарегистрируйтесь</Button>
        чтобы добавлять и просматривать фильмы и игры
    </p>
}