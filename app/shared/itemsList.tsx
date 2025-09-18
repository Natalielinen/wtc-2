"use client";

import { Preview } from "./preview";
import { useUserStore } from "../stores/userStore";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { Session } from "next-auth";
import { getUserItems } from "@/server/actions/user-items";

export const ItemsList = ({ session }: { session: Session | null }) => {
    // Данные и состояние
    const { setOpenLoginModal } = useUserStore((state) => state);

    const openLoginModal = () => setOpenLoginModal(true);

    const [userItems, setUserItems] = React.useState<any[]>([]);

    const fetchItems = async () => {
        if (!session) {
            return;
        } else {
            const items = await getUserItems(session?.user?.id || "");
            setUserItems(items);
        }
    };

    useEffect(() => {
        fetchItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session]);

    // UI
    return session ? (
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
            {userItems.length > 0 &&
                userItems.map((item) => <Preview key={item.id} item={item} />)}
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
