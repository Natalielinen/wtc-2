'use client';

import { Asterisk } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ErrorText } from "../errorText";

interface Props {
    name: string;
    label?: string;
    required?: boolean;
    className?: string;
    options: string[];
    placeholder?: string;
    disabled?: boolean;
}

export const FormSelect: React.FC<Props> = ({
    name, label, options, placeholder, required, className, disabled = false,
}) => {

    const { control } = useFormContext();

    return <div className={className}>
        {
            label && <Label htmlFor={name} className="flex">
                {label} {required && <Asterisk className="text-red-500" size={16} />}
            </Label>
        }

        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => {
                console.log('field', field);

                return <>

                    <Select onValueChange={field.onChange} disabled={disabled} value={field.value}>

                        <SelectTrigger >
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent >
                            {
                                options && options.map((item) => <SelectItem
                                    key={item}
                                    value={item}
                                >{item}</SelectItem>)
                            }
                        </SelectContent>
                    </Select>
                    {fieldState.error && <ErrorText text={fieldState.error.message as string} />}
                </>
            }}

        />

    </div>;
};
