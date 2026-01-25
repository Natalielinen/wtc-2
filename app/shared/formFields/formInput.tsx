'use client';

import { Asterisk } from "lucide-react";
import { ClearButton, ErrorText } from "..";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    required?: boolean;
    className?: string;
    icon?: React.ReactNode;
    hint?: string;
}

export const FormInput: React.FC<Props> = (
    {
        className,
        name,
        label,
        required = false,
        icon = null,
        hint = null,
        ...props

    }) => {

    const {
        register,
        formState: { errors },
        watch,
        setValue
    } = useFormContext();

    const value = watch(name);
    const error = errors[name];

    return <div className={className}>
        {
            label && <p className="flex font-medium mb-2">
                {label} {required && <Asterisk className="text-red-500" />}
            </p>
        }

        <div className="relative">
            <Input
                className="text-md"
                {...register(name)}
                {...props} />

            {icon && <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100 cursor-pointer">{icon}</div>}
            {value && <ClearButton onClick={() => setValue(name, '')} />}

        </div>
        {
            hint && <p className="text-xs text-muted-foreground mt-2">{hint}</p>
        }

        {
            error && <ErrorText text={error.message as string} />
        }

    </div>
};