'use client';

import { FC, useState } from "react";
import { Website } from "../types";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddWebsiteModal from "./add-website-modal";


type WebsitesProps = {
    websites: Website[]
}
export const Websites: FC<WebsitesProps> = ({ websites }) => {
    const [openAddModal, setOpenAddModal] = useState(false);
    const websiteChipClasses = "p-2 px-4 rounded-md  text-sm bg-secondary"

    const handleToggleAddModal = () => setOpenAddModal(!openAddModal);

    return <div className="flex gap-3 mb-4">
        {websites.length === 0
            ? <p className={`${websiteChipClasses} cursor-pointer`} onClick={handleToggleAddModal}>Сюда можно добавить любимые сайты</p>
            : websites.map((website) => <p key={website.id} className={websiteChipClasses}><a href={website.url} target="_blank">{website.name}</a></p>)}

        {websites.length > 0 && <Button onClick={handleToggleAddModal}><Plus /></Button>}

        <AddWebsiteModal openAddModal={openAddModal} setShow={setOpenAddModal} />

    </div>
}