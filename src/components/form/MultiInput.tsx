import React, { KeyboardEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Label } from "@/components/ui/label";

interface MultipleInputFieldProps {
    label?: string;
    values: string[];
    onChange: (values: string[]) => void;
    placeholder?: string;
    className?: string;
    error?: string;
}

const MultipleInputField: React.FC<MultipleInputFieldProps> = ({
    label,
    values,
    onChange,
    placeholder = "Enter a feature...",
    className = "",
    error
}) => {
    const [inputValue, setInputValue] = useState("");

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if ((e.key === "Enter" || e.key === ",") && inputValue.trim()) {
            e.preventDefault();
            const trimmedValue = inputValue.trim();
            if (!values.includes(trimmedValue)) {
                onChange([...values, trimmedValue]);
            }
            setInputValue("");
        }
    };

    const removeFeature = (index: number) => {
        onChange(values.filter((_, i) => i !== index));
    };

    return (
        <div className={`space-y-2 ${className}`}>
            {label && (
                <Label
                    className=" block mb-2 text-base  font-montserrat text-gray-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {label}
                </Label>
            )}
            <div
                className="flex  bg-white items-center gap-2 h-10 border rounded-md px-2 ">
                {values.map((feature, index) => (
                    <Badge
                        key={index}
                        variant="secondary"
                        className="inline-flex items-center h-6  py-1 rounded-full bg-gray-100 text-gray-800 capitalize"
                    >
                        {feature}
                        <X onClick={() => removeFeature(index)}
                            className={'font-montserrat font-semibold cursor-pointer '}
                        />
                    </Badge>
                ))}
                <Input
                    type="text"
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className={`flex-1 h-8 border-none focus-visible:ring-0 focus-visible:ring-offset-0
                    ${error ? "border-red-500 focus:ring-red-500 active:ring-red-500 " : "border-gray-300 focus:ring-green-500 focus:border-purple-500"} `}
                />
            </div>
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
};

export default MultipleInputField;
