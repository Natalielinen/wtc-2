'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { mockCategories, mockgenres } from "../mocks/data";
import { FormInput, FormSelect } from "./formFields";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button";
import { AddItemFormValues, addItemSchema } from "./schemas/addItemFormSchema";
import { SearchInput } from "./serchInput";
import { Item, ItemFields } from "../types";
import { db } from "../constants/firebaseConfig";
import { addDoc, collection, getDocs, query, where } from "@firebase/firestore";
import { useUserStore } from "../stores/userStore";
import toast from "react-hot-toast";
import { log } from "console";

type AddItemModalProps = {
    editMode?: boolean;
    openAddModal: boolean;
    setShow: (show: boolean) => void;
    editValues?: AddItemFormValues;
}

export const AddItemModal = ({ editMode = false, openAddModal, setShow, editValues }: AddItemModalProps) => {

    const user = useUserStore((state) => state.currentUser);
    const setUser = useUserStore((state) => state.setCurrentUser);

    const form = useForm<AddItemFormValues>({
        defaultValues: editMode ? editValues : {
            category: mockCategories[0].value,
            genre: mockgenres[0].value,
            name: '',
            sourceLink: '',
            imageUrl: '',
        },
        resolver: zodResolver(addItemSchema),
    });


    const onItemClick = (item: Item) => {
        // Используем строгое обновление значений формы
        form.reset({
            category: item.category.value,
            genre: item.genre[0].value,
            name: item.name,
            sourceLink: item.sourceLink,
            imageUrl: item.imageUrl,
        });
    };

    const onSubmit = async (data: AddItemFormValues) => {
        console.log(data);
        try {
            const itemRef = collection(db, "item"); // Ссылка на коллекцию `item`

            const newItem: ItemFields = {
                ...data,
                lastVisited: new Date(),
                userId: user?.id || '',
            };

            console.log('user', user);


            await addDoc(itemRef, newItem); // Добавляем в Firestore

            setShow(false);

            const itemsRef = collection(db, "item");
            const q = query(itemsRef, where("userId", "==", user?.id));
            const itemsSnap = await getDocs(q);

            const userItems = itemsSnap.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));


            // Сохраняем пользователя в Zustand
            setUser({
                ...user, // Пароль хранить не нужно
                userItems,
            });

            toast.success('Элемент успешно добавлен');
        } catch (error) {
            console.error("Ошибка при добавлении элемента:", error);
            throw error;
        }
    };

    return <Dialog open={openAddModal} onOpenChange={() => setShow(false)}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{
                    editMode ?
                        "Редактирование" :
                        "Добавление"
                }
                </DialogTitle>
                <DialogDescription>
                    {
                        !editMode && <SearchInput onClick={onItemClick} />
                    }
                    <FormProvider {...form}>
                        <form key={JSON.stringify(form.getValues())} className='flex flex-col gap-4 mt-4' onSubmit={form.handleSubmit(onSubmit)}>

                            <FormSelect
                                name="category"
                                options={mockCategories}

                            />
                            <FormSelect
                                name="genre"
                                options={mockgenres}


                            />
                            <FormInput name="name" placeholder="Название" />
                            <FormInput name="sourceLink" placeholder="Ссылка" />
                            <FormInput name="imageUrl" placeholder="Ссылка на изображение" />

                            <Button type="submit" disabled={form.formState.isSubmitting}>Сохранить</Button>
                        </form>
                    </FormProvider>

                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
}