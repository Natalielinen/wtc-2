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
            toast.error(`Ошибка при удалении элемента ${name}`);
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
                    <DialogTitle>Удаление</DialogTitle>
                    <DialogDescription>
                        Вы действительно хотите удалить <strong>{name}</strong>?
                        <div className="flex gap-4 mt-4">
                            <Button
                                variant="destructive"
                                onClick={handleDeleteItem}
                                disabled={deleting}
                            >
                                Да, удалить
                            </Button>

                            <Button
                                variant="secondary"
                                onClick={() => setShow(false)}
                                disabled={deleting}
                            >
                                Отменить
                            </Button>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default ConfirmDeleteModal;
