import Link from "next/link";
import { Item } from "../types";
import { useLanguage } from "../providers/LanguageProvider";
import { Lang, translation } from "@/translation/translation";

type ChoosenItem = {
    item: Item;
    loading?: boolean;
};

export const ChoosenItem = ({ item, loading }: ChoosenItem) => {
    const { lang } = useLanguage();
    return (
        <div>
            {loading ? (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
                </div>
            ) : (
                <>
                    <p className="text-lg font-bold mb-4 text-center">{item.name}</p>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.imageUrl} alt={item.name} width="100%" height="100%" />
                    <Link href={item.sourceLink} target="_blank">
                        <p className="mt-4 text-center">
                            {item.category === "фильмы"
                                ? translation[lang as Lang].watch
                                : translation[lang as Lang].play}
                        </p>
                    </Link>
                </>
            )}
        </div>
    );
};
