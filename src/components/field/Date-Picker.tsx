"use client"

import * as React from "react"
import {ChevronDownIcon} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Calendar} from "@/components/ui/calendar"
import {Label} from "@/components/ui/label"
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover"

interface DatePickerProps {
    label?: string
    value?: Date
    onChange?: (date: Date | undefined) => void
    placeholder?: string
    className?: string
    id?: string
    format?: (date: Date) => string
}

function formatDateToDDMMYYYY(date: Date): string {
    const day = date.getDate().toString().padStart(2, "0")
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const year = date.getFullYear().toString()
    return `${day}/${month}/${year}`
}

export function DatePicker({
                               label,
                               value,
                               onChange,
                               placeholder = "Select date",
                               className,
                               id = "date-picker",
                               format = formatDateToDDMMYYYY,
                           }: DatePickerProps) {
    const [open, setOpen] = React.useState(false)
    const [date, setDate] = React.useState<Date | undefined>(value)

    React.useEffect(() => {
        setDate(value)
    }, [value])

    const handleSelect = (newDate: Date | undefined) => {
        setDate(newDate)
        onChange?.(newDate)
        setOpen(false)
    }

    return (
        <div className="flex flex-col gap-3">
            {label && (
                <Label htmlFor={id} className="px-1">
                    {label}
                </Label>
            )}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id={id}
                        className={`w-48 justify-between font-normal ${className || ""}`}
                        aria-expanded={open}
                        aria-haspopup="dialog"
                        aria-controls={`${id}-dialog`}
                    >
                        {date ? format(date) : placeholder}
                        <ChevronDownIcon/>
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    id={`${id}-dialog`}
                    role="dialog"
                    aria-modal="true"
                    className="w-auto overflow-hidden p-0"
                    align="start"
                >
                    <Calendar
                        mode="single"
                        selected={date}
                        captionLayout="dropdown"
                        onSelect={handleSelect}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
