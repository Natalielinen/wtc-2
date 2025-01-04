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
import { Item } from "../types";

type AddItemModalProps = {
    editMode?: boolean;
    openAddModal: boolean;
    setShow: (show: boolean) => void;
    editValues?: AddItemFormValues;
}

export const AddItemModal = ({ editMode = false, openAddModal, setShow, editValues }: AddItemModalProps) => {

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
                        <form key={JSON.stringify(form.getValues())} className='flex flex-col gap-4 mt-4' onSubmit={form.handleSubmit((data) => console.log(data))}>

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

                            <Button type="submit">Сохранить</Button>
                        </form>
                    </FormProvider>

                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
}