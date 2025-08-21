'use client';

import {Label} from "@/components/ui/label";
import MultipleSelector, {Option} from "@/components/ui/multiselect";
import {cn} from "@/lib/utils";
import {useState} from "react";

interface MultiSelectFieldProps {
    label?: string;
    required?: boolean;
    placeholder?: string;
    options: Option[] | any;
    error?: string;
    name?: string;
    onChangeAction: (value: string[]) => void;
    className?: string;

    [key: string]: any; // Accepts additional props for flexibility
}

export default function MultiSelectField({
                                             label,
                                             required,
                                             placeholder = "Select options",
                                             options = [],
                                             error,
                                             name,
                                             onChangeAction,
                                             className = "",
                                             ...props
                                         }: MultiSelectFieldProps) {
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

    const handleChange = (selected: Option[]) => {
        setSelectedOptions(selected);
        const selectedValues = selected.map(option => option.value);
        onChangeAction(selectedValues);
    };

    return (
        <div className="space-y-2">
            {label && (
                <Label
                    htmlFor={name}
                    className={cn("text-sm font-medium", error && "text-red-500")}
                >
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </Label>
            )}

            <MultipleSelector
                value={selectedOptions}
                onChange={handleChange}
                options={options}
                placeholder={placeholder}
                className={cn(
                    "w-full focus:outline-none focus:ring-0",
                    error && "border-red-500 ring-red-500",
                    className
                )}
                commandProps={{
                    label: label || "Select options",
                }}
                emptyIndicator={
                    <p className="text-center text-sm text-muted-foreground">
                        No results found
                    </p>
                }
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
}