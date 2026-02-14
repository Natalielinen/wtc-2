"use client";

import { Preview } from "./preview";
import { useUserStore } from "../stores/userStore";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { Session } from "next-auth";
import { useItemsStore } from "../stores/items-store";
import { Websites } from "./websites";
import { Skeleton } from "@/components/ui/skeleton";
import { Lang, translation } from "@/translation/translation";
import { useLanguage } from "../providers/LanguageProvider";

export const ItemsList = ({ session }: { session: Session | null }) => {
    // Данные и состояние
    const { setOpenLoginModal, setRegisterForm } = useUserStore((state) => state);
    const { lang } = useLanguage();
    const { items, websites, websitesLoading, fetchItems, fetchWebsites } = useItemsStore((state) => state);

    const openLoginModal = () => setOpenLoginModal(true);

    const openRegisterModal = () => {
        setRegisterForm(true);
        setOpenLoginModal(true);
    }

    useEffect(() => {
        fetchItems(session?.user?.id || "");
        fetchWebsites(session?.user?.id || "");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session]);

    // UI
    return session ? (
        <>
            {websitesLoading ? <Skeleton className="h-10 w-[300px] mb-4" /> : <Websites websites={websites} />}
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
                {items.length > 0 &&
                    items.map((item) => <Preview key={item.id} item={item} />)}
            </div>
        </>

    ) : (
        <p>
            <Button variant="link" onClick={openLoginModal}>
                {translation[lang as Lang].signin}
            </Button>
            {translation[lang as Lang].or}
            <Button variant="link" onClick={openLoginModal}>
                {translation[lang as Lang].signup}
            </Button>
            {translation[lang as Lang].viewAndAdd}
        </p>
    );
};
