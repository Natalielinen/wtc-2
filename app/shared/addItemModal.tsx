"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { FormInput, FormSelect } from "./formFields";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { AddItemFormValues, addItemSchema } from "./schemas/addItemFormSchema";
import { SearchInput } from "./serch-modal-Input";
import { Category, Genre, Item } from "../types";
import toast from "react-hot-toast";
import { CategoriesEnum, GenreEnum } from "@/server/schema";
import { addItem } from "@/server/actions/add-item";
import { editItem } from "@/server/actions/edit-item";
import { FormTextarea } from "./formFields/formTextarea";
import { useEffect } from "react";

type AddItemModalProps = {
    editMode?: boolean;
    openAddModal: boolean;
    setShow: (show: boolean) => void;
    editValues?: AddItemFormValues;
    itemId?: string;
};

export const AddItemModal = ({
    editMode = false,
    openAddModal,
    setShow,
    editValues,
    itemId,
}: AddItemModalProps) => {
    const form = useForm<AddItemFormValues>({
        defaultValues: editMode
            ? editValues
            : {
                category: CategoriesEnum.enumValues[0],
                genre: GenreEnum.enumValues[0],
                name: "",
                sourceLink: "",
                imageUrl: "",
            },
        resolver: zodResolver(addItemSchema),
    });

    useEffect(() => {

        if (editValues) {
            form.reset({
                category: editValues.category as Category,
                genre: editValues.genre as Genre,
                name: editValues.name,
                sourceLink: editValues.sourceLink,
                imageUrl: editValues.imageUrl,
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editValues])

    const onItemClick = (item: Item) => {
        // Используем строгое обновление значений формы
        form.reset({
            category: item.category as Category,
            genre: item.genre as Genre,
            name: item.name,
            sourceLink: item.sourceLink,
            imageUrl: item.imageUrl,
        });
    };

    const onSubmit = async (data: AddItemFormValues) => {
        if (!editMode) {
            try {
                await addItem({
                    imageUrl: data.imageUrl || "",
                    name: data.name,
                    sourceLink: data.sourceLink,
                    category: data.category as Category,
                    genre: data.genre as Genre,
                }).then((res) => {
                    toast.success(res.success);
                    setShow(false);
                });
            } catch (error) {
                console.error("Ошибка при добавлении элемента:", error);
                throw error;
            }
        } else {
            try {
                if (!itemId) {
                    return;
                }

                editItem({
                    id: itemId,
                    imageUrl: data.imageUrl || "",
                    name: data.name,
                    sourceLink: data.sourceLink,
                    category: data.category as Category,
                    genre: data.genre as Genre,
                }).then((res) => {
                    toast.success(res.success);
                    setShow(false);
                });
            } catch (error) {
                toast.error(`Ошибка при обновлении элемента: ${error}`);
                throw error;
            } finally {
                setShow(false);
            }
        }

        form.reset();
    };

    return (
        <Dialog open={openAddModal} onOpenChange={() => setShow(false)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {editMode ? "Редактирование" : "Добавление"}
                    </DialogTitle>
                    <DialogDescription>
                        {!editMode && <SearchInput onClick={onItemClick} />}
                        <FormProvider {...form}>
                            <form
                                className="flex flex-col gap-4 mt-4"
                                onSubmit={form.handleSubmit(onSubmit)}
                            >
                                <FormSelect
                                    name="category"
                                    options={CategoriesEnum.enumValues as string[]}
                                />
                                <FormSelect
                                    name="genre"
                                    options={GenreEnum.enumValues as string[]}
                                />
                                <FormInput name="name" placeholder="Название" />
                                <FormTextarea name="sourceLink" placeholder="Ссылки (можно добавить несколько ссылок через запятую без пробелов)" />
                                <FormInput
                                    name="imageUrl"
                                    placeholder="Ссылка на изображение"

                                />

                                <Button type="submit" disabled={form.formState.isSubmitting}>
                                    Сохранить
                                </Button>
                            </form>
                        </FormProvider>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default AddItemModal;
