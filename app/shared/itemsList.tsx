"use client";

import { Preview } from "./preview";
import { useUserStore } from "../stores/userStore";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { Session } from "next-auth";
import { useItemsStore } from "../stores/items-store";

export const ItemsList = ({ session }: { session: Session | null }) => {
    // Данные и состояние
    const { setOpenLoginModal } = useUserStore((state) => state);
    const { items, fetchItems } = useItemsStore((state) => state);

    const openLoginModal = () => setOpenLoginModal(true);

    useEffect(() => {
        fetchItems(session?.user?.id || "");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session]);

    // UI
    return session ? (
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
            {items.length > 0 &&
                items.map((item) => <Preview key={item.id} item={item} />)}
        </div>
    ) : (
        <p>
            <Button variant="link" onClick={openLoginModal}>
                Войдите
            </Button>
            или
            <Button variant="link" onClick={openLoginModal}>
                Зарегистрируйтесь
            </Button>
            чтобы добавлять и просматривать фильмы и игры
        </p>
    );
};
