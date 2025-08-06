"use client"

import type { Row } from "@tanstack/react-table"
import { EllipsisIcon, EyeIcon, EditIcon, TrashIcon, CopyIcon } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface RowActionsProps<TData extends { id: any; [key: string]: any }> {
    row: Row<TData>
    onEditAction?: (rowData: TData) => void
    onDeleteAction?: (rowData: TData) => void
    onViewAction?: (rowData: TData) => void
}

export function RowActions<TData extends { id: any; [key: string]: any }>({
                                                                              row,
                                                                              onEditAction,
                                                                              onDeleteAction,
                                                                              onViewAction,
                                                                          }: RowActionsProps<TData>) {
    const rowData = row.original
    const rowId = rowData.id?.toString() || "N/A"

    const handleCopyId = () => {
        navigator.clipboard.writeText(rowId)
    }

    const handleEdit = () => {
        onEditAction?.(rowData)
    }

    const handleDelete = () => {
        onDeleteAction?.(rowData)
    }

    const handleView = () => {
        onViewAction?.(rowData)
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <EllipsisIcon className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={handleCopyId}>
                    <CopyIcon className="mr-2 h-4 w-4" />
                    Copy ID
                </DropdownMenuItem>
                {(onViewAction || onEditAction) && <DropdownMenuSeparator />}
                {onViewAction && (
                    <DropdownMenuItem onClick={handleView}>
                        <EyeIcon className="mr-2 h-4 w-4" />
                        View Details
                    </DropdownMenuItem>
                )}
                {onEditAction && (
                    <DropdownMenuItem onClick={handleEdit}>
                        <EditIcon className="mr-2 h-4 w-4" />
                        Edit
                    </DropdownMenuItem>
                )}
                {onDeleteAction && (onViewAction || onEditAction) && <DropdownMenuSeparator />}
                {onDeleteAction && (
                    <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                        <TrashIcon className="mr-2 h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
