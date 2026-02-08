import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FC } from "react";


type SelectLinkModalProps = {
    openLinkDialog: boolean;
    setShow: (show: boolean) => void;
    links: string[];
    onPlayClick: () => void;
}

export const SelectLinkModal: FC<SelectLinkModalProps> = ({ openLinkDialog, setShow, links, onPlayClick }) => {


    const websiteName = (url: string) => {
        try {
            const normalizedUrl = url.startsWith('http')
                ? url
                : `https://${url}`;

            const hostname = new URL(encodeURI(normalizedUrl)).hostname;

            const parts = hostname.replace(/^www\./, '').split('.');
            return parts[parts.length - 2];
        } catch (error) {
            console.error('Error parsing URL:', error);
            return url;
        }
    };

    const onLinkClick = () => {
        onPlayClick();
        setShow(false);
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
                            links.map((link, index) => <a key={index} href={link} target="_blank" rel="noopener noreferrer" onClick={onLinkClick}>{websiteName(link)}</a>)
                        }

                    </div>


                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}