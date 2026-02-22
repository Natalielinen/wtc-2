"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";
import { useState } from "react";
import { deleteItem } from "@/server/actions/delete-item";
import { useLanguage } from "../providers/LanguageProvider";
import { Lang, translation } from "@/translation/translation";

type ConfirmDeleteModalProps = {
    openDeleteModal: boolean;
    setShow: (show: boolean) => void;
    name: string;
    id: string;
};

export const ConfirmDeleteModal = ({
    openDeleteModal,
    setShow,
    name,
    id,
}: ConfirmDeleteModalProps) => {
    const { lang } = useLanguage();
    // Данные и состояние
    const [deleting, setDeleting] = useState(false);

    const handleDeleteItem = async () => {
        try {
            setDeleting(true);
            deleteItem(id, name)
                .then((res) => {
                    toast.success(res.success);
                })
                .finally(() => {
                    setShow(false);
                    setDeleting(false);
                });
        } catch (error) {
            toast.error(`${translation[lang as Lang].errorDeletingElement} ${name}`);
            throw error;
        } finally {
            setDeleting(false);
            setShow(false);
        }
    };

    return (
        <Dialog open={openDeleteModal} onOpenChange={() => setShow(false)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{translation[lang as Lang].deleting}</DialogTitle>
                    <DialogDescription>
                        {translation[lang as Lang].doYouReallyWantToDelete}{" "}
                        <strong>{name}</strong>?
                        <div className="flex gap-4 mt-4">
                            <Button
                                variant="destructive"
                                onClick={handleDeleteItem}
                                disabled={deleting}
                            >
                                {translation[lang as Lang].yesDelete}
                            </Button>

                            <Button
                                variant="secondary"
                                onClick={() => setShow(false)}
                                disabled={deleting}
                            >
                                {translation[lang as Lang].cancel}
                            </Button>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default ConfirmDeleteModal;
