import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FC } from "react";


type SelectLinkModalProps = {
    openLinkDialog: boolean;
    setShow: (show: boolean) => void;
    links: string[];
}

export const SelectLinkModal: FC<SelectLinkModalProps> = ({ openLinkDialog, setShow, links }) => {
    const websiteName = (url: string) => {
        const urlStr = url;

        // 1. Создаем объект URL, чтобы корректно отсечь протоколы и пути
        const hostname = new URL(urlStr).hostname;
        // Результат: "hd.kinopoisk.ru"

        // 2. Разбиваем по точкам и берем нужную часть
        const parts = hostname.replace('www.', '').split('.');
        const name = parts[parts.length - 2];

        console.log(name); // "kinopoisk"

        return name;
    }
    return (
        <Dialog open={openLinkDialog} onOpenChange={() => setShow(false)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Где хочешь посмотреть?
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    <div className="flex flex-col gap-2">
                        {
                            links.map((link, index) => <a key={index} href={link} target="_blank" rel="noopener noreferrer">{websiteName(link)}</a>)
                        }

                    </div>


                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}