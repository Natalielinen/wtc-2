"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { FormInput } from "./formFields";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { AddWebsiteFormValues, addWebsiteSchema } from "./schemas/addWebsiteFormSchema";
import { addWebsite } from "@/server/actions/add-website";

type AddWebsiteModalProps = {
    openAddModal: boolean;
    setShow: (show: boolean) => void;
};

export const AddWebsiteModal = ({
    openAddModal,
    setShow,
}: AddWebsiteModalProps) => {
    const form = useForm<AddWebsiteFormValues>({
        defaultValues: {
            name: "",
            url: "",
        },
        resolver: zodResolver(addWebsiteSchema),
    });


    const onSubmit = async (data: AddWebsiteFormValues) => {
        addWebsite(data);
        form.reset();
        setShow(false);
    };

    return (
        <Dialog open={openAddModal} onOpenChange={() => setShow(false)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Добавить сайт
                    </DialogTitle>
                    <DialogDescription>
                        <FormProvider {...form}>
                            <form
                                className="flex flex-col gap-4 mt-4"
                                onSubmit={form.handleSubmit(onSubmit)}
                            >
                                <FormInput name="name" placeholder="Название" />
                                <FormInput
                                    name="url"
                                    placeholder="Ссылка на сайт"

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

export default AddWebsiteModal;
