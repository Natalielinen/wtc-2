import Link from "next/link";
import { Item } from "../types";

type ChoosenItem = {
    item: Item;
}

export const ChoosenItem = ({ item }: ChoosenItem) => {
    return (
        <div>
            <p className="text-lg font-bold mb-4 text-center">{item.name}</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.imageUrl} alt={item.name} width="100%" height="100%" />
            <Link href={item.sourceLink} target="_blank">
                <p className="mt-4 text-center" >
                    {
                        item.category === "фильмы" ? "Смотреть" : "Играть"
                    }
                </p>
            </Link>
        </div>

    )
}