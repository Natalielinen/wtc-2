/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { deleteDoc, doc } from "@firebase/firestore";
import toast from "react-hot-toast";
import { db } from "../constants/firebaseConfig";
import { useState } from "react";
import { getUsetItems } from "@/lib/getItems";
import { useUserStore } from "../stores/userStore";

type ConfirmDeleteModalProps = {
    openDeleteModal: boolean;
    setShow: (show: boolean) => void;
    name: string;
    id: string;
}

export const ConfirmDeleteModal = ({ openDeleteModal, setShow, name, id }: ConfirmDeleteModalProps) => {

    const [deleting, setDeleting] = useState(false);

    const user = useUserStore((state) => state.currentUser);
    const setUser = useUserStore((state) => state.setCurrentUser);


    const deleteItem = async () => {
        setDeleting(true);
        try {
            const itemRef = doc(db, "item", id); // Ссылка на документ в коллекции `item`
            await deleteDoc(itemRef);
            toast.success(`Элемент ${name} успешно удален`);
        } catch (error) {
            toast.error(`Ошибка при удалении элемента ${name}`);
            throw error;
        } finally {
            setDeleting(false);
            setShow(false);

            const userItems = await getUsetItems({
                userId: user?.id || '',
            });

            // Сохраняем пользователя в Zustand
            // @ts-ignore
            setUser({ ...user, userItems, });
        }
    };

    return <Dialog open={openDeleteModal} onOpenChange={() => setShow(false)}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Удаление
                </DialogTitle>
                <DialogDescription>
                    Вы действительно хотите удалить <strong>{name}</strong>?
                    <div className="flex gap-4 mt-4">
                        <Button variant="destructive" onClick={() => deleteItem()} disabled={deleting}>
                            Да, удалить
                        </Button>

                        <Button variant="secondary" onClick={() => setShow(false)} disabled={deleting}>
                            Отменить
                        </Button>

                    </div>

                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
}