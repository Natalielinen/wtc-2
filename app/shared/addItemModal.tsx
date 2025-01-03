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
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type AddItemModalProps = {
    editMode?: boolean;
    openAddModal: boolean;
    setShow: (show: boolean) => void
}

export const AddItemModal = ({ editMode = false, openAddModal, setShow }: AddItemModalProps) => {

    const form = useForm<any>();

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
                        !editMode && <Select >

                            <SelectTrigger>
                                <SelectValue placeholder="Выбрать из списка" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">Название фильма</SelectItem>
                            </SelectContent>
                        </Select>
                    }
                    <FormProvider {...form}>
                        <form className='flex flex-col gap-4 mt-4'>
                            <FormSelect
                                name="category"
                                options={mockCategories
                                    .map(category => ({ label: category.name, value: String(category.id) }))}

                            />
                            <FormSelect
                                name="genre"
                                options={mockgenres
                                    .map(genre => ({ label: genre.name, value: String(genre.id) }))}

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