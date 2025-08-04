import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {ChevronDownIcon} from "lucide-react";
import React from "react";

type SubMenuItem = {
    name: string;
    icon?: React.ElementType;
    shortcut?: string;
};

type MenuItem = {
    name: string;
    icon?: React.ElementType;
    shortcut?: string;
    subMenu?: SubMenuItem[];
    destructive?: boolean;
};

interface DropDownFieldProps {
    items: MenuItem[];
    label?: string;
    buttonText?: string;
}

export function DropDownField({
                                  items,
                                  label = "Filter",
                                  buttonText = "Options",
                              }: DropDownFieldProps) {
    return (
        <div>
            <Label
                htmlFor="dropdown"
                className="block text-base font-medium text-gray-700 mb-1"
            >
                {label}
            </Label>
            <DropdownMenu>
                <DropdownMenuTrigger asChild className={'focus:outline-none  focus-visible:ring-0'}>
                    <Button
                        variant="outline"
                        id="dropdown"
                        className="flex items-center justify-between gap-2 text-sm "
                    >
                        {buttonText}
                        <ChevronDownIcon className="-me-1 opacity-60" size={16}/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-fit">
                    {items.map((item, index) => {
                        if (item.subMenu) {
                            return (
                                <DropdownMenuGroup key={index}>
                                    <DropdownMenuSub>
                                        <DropdownMenuSubTrigger className="flex items-center gap-2">
                                            {item.icon && <item.icon size={16} className="opacity-60"/>}
                                            <span>{item.name}</span>
                                        </DropdownMenuSubTrigger>
                                        <DropdownMenuPortal>
                                            <DropdownMenuSubContent>
                                                {item.subMenu.map((subItem, subIndex) => (
                                                    <DropdownMenuItem key={subIndex}
                                                                      className="flex items-center gap-2">
                                                        {subItem.icon && (
                                                            <subItem.icon size={16} className="opacity-60"/>
                                                        )}
                                                        <span>{subItem.name}</span>
                                                        {subItem.shortcut && (
                                                            <DropdownMenuShortcut>{subItem.shortcut}</DropdownMenuShortcut>
                                                        )}
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuSubContent>
                                        </DropdownMenuPortal>
                                    </DropdownMenuSub>
                                </DropdownMenuGroup>
                            );
                        }

                        return (
                            <DropdownMenuGroup key={index}>
                                <DropdownMenuItem
                                    className={`flex  items-center gap-2 ${
                                        item.destructive ? "text-red-600 focus:bg-red-50" : ""
                                    }`}
                                >
                                    {item.icon && <item.icon size={16} className="opacity-60"/>}
                                    <span>{item.name}</span>
                                    {item.shortcut && (
                                        <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>
                                    )}
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        );
                    })}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
